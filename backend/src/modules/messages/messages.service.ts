

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Message } from './schemas/message.schema';
import { Chat } from '../chats/schemas/chat.schema';
import { SendEncryptedMessageDto } from './dto/send-encrypted-message.dto';
import { UploadMediaDto } from './dto/upload-media.dto';
import { EditMessageDto } from './dto/edit-message.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';

@Injectable()
export class MessagesService {
 
  private gateway: any = null;

  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
  ) {}

 
  setGateway(gateway: any) {
    this.gateway = gateway;
  }

 
  async sendEncryptedMessage(userId: string, dto: SendEncryptedMessageDto) {
    const message = await this.messageModel.create({
      chatId: dto.chatId,
      senderId: userId,
      ciphertext: dto.ciphertext,
      nonce: dto.nonce,
      senderEphemeralPub: dto.senderEphemeralPub,
      senderDeviceId: dto.senderDeviceId,
    });

    await this.chatModel.findByIdAndUpdate(dto.chatId, {
      lastMessage: '[encrypted]',
      lastMessageAt: new Date(),
    });

   
    if (this.gateway?.server) {
      this.gateway.server.to(dto.chatId).emit('newEncryptedMessage', message);
    }

    return message;
  }

  async getMessages(chatId: string) {
    return this.messageModel
      .find({ chatId })
      .populate('senderId', 'name email profileImage')
      .sort({ createdAt: 1 })
      .lean();
  }

  async markDelivered(messageId: string) {
    const updated = await this.messageModel.findByIdAndUpdate(
      messageId,
      { deliveredAt: new Date() },
      { new: true }
    );

    // notify room that message delivery changed
    if (updated && this.gateway?.server) {
      this.gateway.server.to(updated.chatId.toString()).emit('messageStatusUpdated', updated);
    }

    return updated;
  }

  async markSeen(messageId: string) {
    const updated = await this.messageModel.findByIdAndUpdate(
      messageId,
      { seenAt: new Date() },
      { new: true }
    );

    if (updated && this.gateway?.server) {
      this.gateway.server.to(updated.chatId.toString()).emit('messageStatusUpdated', updated);
    }

    return updated;
  }

  async handleMediaMessage(dto: UploadMediaDto, file: Express.Multer.File) {
    const mediaUrl = `/uploads/${file.filename}`;

    const message = await this.messageModel.create({
      chatId: dto.chatId,
      senderId: dto.senderId,
      mediaUrl,
      mediaType: file.mimetype,
      ciphertext: null,
      nonce: null,
      senderEphemeralPub: null,
      senderDeviceId: null,
    });

    // Emit created media message
    if (this.gateway?.server) {
      this.gateway.server.to(dto.chatId).emit('newMediaMessage', message);
    }

    return message;
  }

  async editMessage(userId: string, dto: EditMessageDto) {
    const msg = await this.messageModel.findById(dto.messageId);

    if (!msg) throw new Error('Message not found');
    if (msg.senderId.toString() !== userId) {
      throw new Error('You can only edit your own messages');
    }

    msg.ciphertext = dto.newText; 
    msg.editedAt = new Date();
    msg.isEdited = true;

    await msg.save();

   
    if (this.gateway?.server) {
      this.gateway.server.to(msg.chatId.toString()).emit('messageEdited', msg);
    }

    return msg;
  }

  async deleteMessage(userId: string, dto: DeleteMessageDto) {
    const msg = await this.messageModel.findById(dto.messageId);
    if (!msg) throw new Error('Message not found');

    if (dto.deleteForEveryone) {
      if (msg.senderId.toString() !== userId) {
        throw new Error('Only the sender can delete for everyone');
      }

      msg.isDeletedForEveryone = true;
      msg.ciphertext = null;
      msg.mediaUrl = null;
    } else {
     
      const existing = msg.deletedFor || [];
      if (!existing.includes(userId)) {
        existing.push(userId);
        msg.deletedFor = existing;
      }
    }

    await msg.save();

    
    if (this.gateway?.server) {
      this.gateway.server
        .to(msg.chatId.toString())
        .emit('messageDeleted', {
          messageId: msg._id,
          deleteForEveryone: dto.deleteForEveryone,
          userId,
        });
    }

    return msg;
  }
}
