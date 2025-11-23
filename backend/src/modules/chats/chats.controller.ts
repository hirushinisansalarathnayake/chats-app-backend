import { Controller, Post, Get, Body, Req, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { ChatsService } from './chats.service';

import { CreateChatDto } from './dto/create-chat.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { RemoveMemberDto } from './dto/remove-member.dto';

@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  
  @Post('create')
  createChat(@Req() req, @Body() dto: CreateChatDto) {
    return this.chatsService.createChat(req.user.id, dto.receiverId);
  }

 
  @Post('group/create')
  createGroup(@Req() req, @Body() dto: CreateGroupDto) {
    return this.chatsService.createGroup({
      ...dto,
      creatorId: req.user.id,
    });
  }


  @Post('group/add-member')
  addMember(@Body() dto: AddMemberDto) {
    return this.chatsService.addMember(dto);
  }

  
  @Post('group/remove-member')
  removeMember(@Body() dto: RemoveMemberDto) {
    return this.chatsService.removeMember(dto);
  }

  
  @Get()
  getMyChats(@Req() req) {
    return this.chatsService.getMyChats(req.user.id);
  }

  
  @Get('group/:chatId')
  getGroupDetails(@Param('chatId') chatId: string) {
    return this.chatsService.getGroupDetails(chatId);
  }
}
