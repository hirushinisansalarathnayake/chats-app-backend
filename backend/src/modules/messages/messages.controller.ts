import { Controller, Post, Get, Body, Req, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { MessagesService } from './messages.service';
import { SendMessageDto } from './dto/send-message.dto';
import { SendEncryptedMessageDto } from './dto/send-encrypted-message.dto';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LocalStorage } from '../../infrastructure/storage/local.storage';
import { UploadMediaDto } from './dto/upload-media.dto';
import { EditMessageDto } from './dto/edit-message.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private messagesService: MessagesService) {}



  @Get()
  getMessages(@Query('chatId') chatId: string) {
    return this.messagesService.getMessages(chatId);
  }
  @Post('send-encrypted')
sendEncrypted(@Req() req, @Body() dto: SendEncryptedMessageDto) {
  return this.messagesService.sendEncryptedMessage(req.user.id, dto);
}
@Post('upload')
@UseInterceptors(FileInterceptor('file', { storage: LocalStorage }))
async uploadMedia(
  @UploadedFile() file: Express.Multer.File,
  @Body() dto: UploadMediaDto
) {
  return this.messagesService.handleMediaMessage(dto, file);
}
@Post('edit')
editMessage(@Req() req, @Body() dto: EditMessageDto) {
  return this.messagesService.editMessage(req.user.id, dto);
}

@Post('delete')
deleteMessage(@Req() req, @Body() dto: DeleteMessageDto) {
  return this.messagesService.deleteMessage(req.user.id, dto);
}



}
