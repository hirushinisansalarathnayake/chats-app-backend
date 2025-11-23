// import {
//   WebSocketGateway,
//   SubscribeMessage,
//   WebSocketServer,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   MessageBody,
//   ConnectedSocket,
// } from '@nestjs/websockets';

// import { Server, Socket } from 'socket.io';
// import { MessagesService } from './messages.service';
// import { SendEncryptedMessageDto } from './dto/send-encrypted-message.dto';
// import { MessageDeliveredDto } from './dto/message-delivered.dto';
// import { MessageSeenDto } from './dto/message-seen.dto';
// import { JwtService } from '@nestjs/jwt';
// import { UsersService } from '../users/users.service';
// import { DeleteMessageDto } from './dto/delete-message.dto';
// import { EditMessageDto } from './dto/edit-message.dto';

// @WebSocketGateway({
//   cors: { origin: '*' },
//   transports: ['websocket', 'polling'],
//   path: '/socket.io',
// })
// export class MessagesGateway
//   implements OnGatewayConnection, OnGatewayDisconnect
// {
//   @WebSocketServer()
//   server: Server;

//   constructor(
//     private messagesService: MessagesService,
//     private usersService: UsersService,
//     private jwtService: JwtService,
//   ) {
//     // 🔥 Register gateway inside MessagesService (prevents circular injection)
//     this.messagesService.setGateway(this);
//   }

//   // 🔐 Extract userId from socket token
//   private getUserIdFromSocket(client: Socket): string | null {
//     try {
//       const token = client.handshake.auth.token;
//       if (!token) return null;

//       const decoded = this.jwtService.verify(token);
//       return decoded.id;
//     } catch (error) {
//       console.log('Invalid token:', error.message);
//       return null;
//     }
//   }

//   // 🔵 When user connects
//   async handleConnection(client: Socket) {
//     const userId = this.getUserIdFromSocket(client);
//     if (!userId) return;

//     console.log(`User connected (online): ${userId}`);

//     await this.usersService.setOnline(userId);

//     // Notify all users
//     this.server.emit('userOnline', { userId });
//   }

//   // 🔴 When user disconnects
//   async handleDisconnect(client: Socket) {
//     const userId = this.getUserIdFromSocket(client);
//     if (!userId) return;

//     console.log(`User disconnected (offline): ${userId}`);

//     const user = await this.usersService.setOffline(userId);

//     this.server.emit('userOffline', {
//       userId,
//       lastSeen: user?.lastSeen || new Date(),
//     });
//   }

//   // 🟢 Joining a chat room
//   @SubscribeMessage('joinChat')
//   handleJoinChat(
//     @ConnectedSocket() client: Socket,
//     @MessageBody() chatId: string,
//   ) {
//     client.join(chatId);
//     console.log(`📌 ${client.id} joined room: ${chatId}`);
//   }

//   // 🔐 End-to-end encrypted message
//   @SubscribeMessage('sendEncryptedMessage')
//   async handleEncryptedMsg(
//     @ConnectedSocket() client: Socket,
//     @MessageBody() dto: SendEncryptedMessageDto,
//   ) {
//     const senderId = dto.senderId;

//     const saved = await this.messagesService.sendEncryptedMessage(
//       senderId,
//       dto,
//     );

//     this.server.to(dto.chatId).emit('newEncryptedMessage', saved);
//   }

//   // 📬 Delivery status
//   @SubscribeMessage('messageDelivered')
//   async onDelivered(@MessageBody() dto: MessageDeliveredDto) {
//     const updated = await this.messagesService.markDelivered(dto.messageId);
//     this.server.to(dto.chatId).emit('messageStatusUpdated', updated);
//   }

//   // 👀 Seen status (read receipt)
//   @SubscribeMessage('messageSeen')
//   async onSeen(@MessageBody() dto: MessageSeenDto) {
//     const updated = await this.messagesService.markSeen(dto.messageId);
//     this.server.to(dto.chatId).emit('messageStatusUpdated', updated);
//   }

//   // ⌨️ Typing indicator
//   @SubscribeMessage('typing')
//   handleTyping(
//     @ConnectedSocket() client: Socket,
//     @MessageBody() data: { chatId: string; userId: string },
//   ) {
//     client.to(data.chatId).emit('typing', {
//       userId: data.userId,
//       chatId: data.chatId,
//       isTyping: true,
//     });
//   }

//   @SubscribeMessage('stopTyping')
//   handleStopTyping(
//     @ConnectedSocket() client: Socket,
//     @MessageBody() data: { chatId: string; userId: string },
//   ) {
//     client.to(data.chatId).emit('typing', {
//       userId: data.userId,
//       chatId: data.chatId,
//       isTyping: false,
//     });
//   }

//   // 📎 Media messages (images, videos, files)
//   @SubscribeMessage('sendMedia')
//   handleSendMedia(@MessageBody() message: any) {
//     this.server.to(message.chatId).emit('newMediaMessage', message);
//   }

//  @SubscribeMessage("editMessage")
// async handleEditMessage(
//   @ConnectedSocket() client: Socket,
//   @MessageBody() dto: EditMessageDto
// ) {
//   const userId = this.getUserIdFromSocket(client); // 🔥 get sender from socket
//   if (!userId) return;

//   const saved = await this.messagesService.editMessage(userId, dto);

//   this.server.to(saved.chatId.toString()).emit("messageEdited", saved);
// }

// @SubscribeMessage("deleteMessage")
// async handleDeleteMessage(
//   @ConnectedSocket() client: Socket,
//   @MessageBody() dto: DeleteMessageDto
// ) {
//   const userId = this.getUserIdFromSocket(client); // 🔥 get sender from socket
//   if (!userId) return;

//   const res = await this.messagesService.deleteMessage(userId, dto);

//   this.server.to(res.chatId.toString()).emit("messageDeleted", {
//     messageId: dto.messageId,
//     deleteForEveryone: dto.deleteForEveryone,
//     userId,
//   });
// }


// }

import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';
import { SendEncryptedMessageDto } from './dto/send-encrypted-message.dto';
import { MessageDeliveredDto } from './dto/message-delivered.dto';
import { MessageSeenDto } from './dto/message-seen.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { DeleteMessageDto } from './dto/delete-message.dto';
import { EditMessageDto } from './dto/edit-message.dto';

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
  path: '/socket.io',
})
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(
    private messagesService: MessagesService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    
    this.messagesService.setGateway(this);
  }


  private getUserIdFromSocket(client: Socket): string | null {
    try {
      const token = client.handshake.auth.token;
      if (!token) return null;

      const decoded = this.jwtService.verify(token);
      return decoded.id;
    } catch (error) {
      console.log('Invalid token:', error.message);
      return null;
    }
  }

  
  async handleConnection(client: Socket) {
    const userId = this.getUserIdFromSocket(client);
    if (!userId) return;

    console.log(`User connected (online): ${userId}`);

    await this.usersService.setOnline(userId);

    // Notify all users
    this.server.emit('userOnline', { userId });
  }


  async handleDisconnect(client: Socket) {
    const userId = this.getUserIdFromSocket(client);
    if (!userId) return;

    console.log(`User disconnected (offline): ${userId}`);

    const user = await this.usersService.setOffline(userId);

    this.server.emit('userOffline', {
      userId,
      lastSeen: user?.lastSeen || new Date(),
    });
  }

  
  @SubscribeMessage('joinChat')
  handleJoinChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() chatId: string,
  ) {
    client.join(chatId);
    console.log(` ${client.id} joined room: ${chatId}`);
  }


  @SubscribeMessage('sendEncryptedMessage')
  async handleEncryptedMsg(
    @ConnectedSocket() client: Socket,
    @MessageBody() dto: SendEncryptedMessageDto,
  ) {
    const senderId = dto.senderId;

    
    await this.messagesService.sendEncryptedMessage(senderId, dto);

    
  }

 
  @SubscribeMessage('messageDelivered')
  async onDelivered(@MessageBody() dto: MessageDeliveredDto) {
    // markDelivered will emit messageStatusUpdated from service
    await this.messagesService.markDelivered(dto.messageId);
  }

  @SubscribeMessage('messageSeen')
  async onSeen(@MessageBody() dto: MessageSeenDto) {
    // markSeen will emit messageStatusUpdated from service
    await this.messagesService.markSeen(dto.messageId);
  }

  
  handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { chatId: string; userId: string },
  ) {
    client.to(data.chatId).emit('typing', {
      userId: data.userId,
      chatId: data.chatId,
      isTyping: true,
    });
  }

  @SubscribeMessage('stopTyping')
  handleStopTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { chatId: string; userId: string },
  ) {
    client.to(data.chatId).emit('typing', {
      userId: data.userId,
      chatId: data.chatId,
      isTyping: false,
    });
  }

 
  @SubscribeMessage('sendMedia')
  handleSendMedia(@MessageBody() message: any) {
    this.server.to(message.chatId).emit('newMediaMessage', message);
  }

  
  @SubscribeMessage('editMessage')
  async handleEditMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() dto: EditMessageDto,
  ) {
    const userId = this.getUserIdFromSocket(client);
    if (!userId) return;

    await this.messagesService.editMessage(userId, dto);
    // service emits 'messageEdited' once
  }

 
  @SubscribeMessage('deleteMessage')
  async handleDeleteMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() dto: DeleteMessageDto,
  ) {
    const userId = this.getUserIdFromSocket(client);
    if (!userId) return;

    await this.messagesService.deleteMessage(userId, dto);
   
  }
}
