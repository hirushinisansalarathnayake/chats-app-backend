import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './schemas/chat.schema';
import { Model } from 'mongoose';
import { RemoveMemberDto } from './dto/remove-member.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
  ) {}

  async createChat(userId: string, receiverId: string) {
  
    const existing = await this.chatModel.findOne({
      participants: { $all: [userId, receiverId] },
      isGroup: false,
    });

    if (existing) return existing;

    // Create new chat
    return this.chatModel.create({
      participants: [userId, receiverId],
      isGroup: false,
      createdBy: userId,
    });
  }

  async getMyChats(userId: string) {
    return this.chatModel
      .find({ participants: userId })
      .populate('participants', 'name email profileImage')
      .sort({ updatedAt: -1 })
      .lean();
  }

  async createGroup(dto: CreateGroupDto) {
  const group = await this.chatModel.create({
    isGroup: true,
    groupName: dto.groupName,
    members: dto.members,
    admins: [dto.creatorId],
    lastMessage: null,
    lastMessageAt: null
  });

  return group;
}
async addMember(dto: AddMemberDto) {
  return this.chatModel.findByIdAndUpdate(
    dto.chatId,
    {
      $addToSet: { members: dto.userId }
    },
    { new: true }
  );
}
async removeMember(dto: RemoveMemberDto) {
  return this.chatModel.findByIdAndUpdate(
    dto.chatId,
    {
      $pull: { members: dto.userId }
    },
    { new: true }
  );
}
async getGroupDetails(chatId: string) {
  return this.chatModel
    .findById(chatId)
    .populate('members', 'name email profileImage')
    .populate('admins', 'name email profileImage')
    .lean();
}

}
