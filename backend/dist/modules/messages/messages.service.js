"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const message_schema_1 = require("./schemas/message.schema");
const chat_schema_1 = require("../chats/schemas/chat.schema");
let MessagesService = class MessagesService {
    messageModel;
    chatModel;
    gateway = null;
    constructor(messageModel, chatModel) {
        this.messageModel = messageModel;
        this.chatModel = chatModel;
    }
    setGateway(gateway) {
        this.gateway = gateway;
    }
    async sendEncryptedMessage(userId, dto) {
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
    async getMessages(chatId) {
        return this.messageModel
            .find({ chatId })
            .populate('senderId', 'name email profileImage')
            .sort({ createdAt: 1 })
            .lean();
    }
    async markDelivered(messageId) {
        const updated = await this.messageModel.findByIdAndUpdate(messageId, { deliveredAt: new Date() }, { new: true });
        if (updated && this.gateway?.server) {
            this.gateway.server.to(updated.chatId.toString()).emit('messageStatusUpdated', updated);
        }
        return updated;
    }
    async markSeen(messageId) {
        const updated = await this.messageModel.findByIdAndUpdate(messageId, { seenAt: new Date() }, { new: true });
        if (updated && this.gateway?.server) {
            this.gateway.server.to(updated.chatId.toString()).emit('messageStatusUpdated', updated);
        }
        return updated;
    }
    async handleMediaMessage(dto, file) {
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
        if (this.gateway?.server) {
            this.gateway.server.to(dto.chatId).emit('newMediaMessage', message);
        }
        return message;
    }
    async editMessage(userId, dto) {
        const msg = await this.messageModel.findById(dto.messageId);
        if (!msg)
            throw new Error('Message not found');
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
    async deleteMessage(userId, dto) {
        const msg = await this.messageModel.findById(dto.messageId);
        if (!msg)
            throw new Error('Message not found');
        if (dto.deleteForEveryone) {
            if (msg.senderId.toString() !== userId) {
                throw new Error('Only the sender can delete for everyone');
            }
            msg.isDeletedForEveryone = true;
            msg.ciphertext = null;
            msg.mediaUrl = null;
        }
        else {
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
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __param(1, (0, mongoose_1.InjectModel)(chat_schema_1.Chat.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], MessagesService);
//# sourceMappingURL=messages.service.js.map