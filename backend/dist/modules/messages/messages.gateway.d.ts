import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';
import { SendEncryptedMessageDto } from './dto/send-encrypted-message.dto';
import { MessageDeliveredDto } from './dto/message-delivered.dto';
import { MessageSeenDto } from './dto/message-seen.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { DeleteMessageDto } from './dto/delete-message.dto';
import { EditMessageDto } from './dto/edit-message.dto';
export declare class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private messagesService;
    private usersService;
    private jwtService;
    server: Server;
    constructor(messagesService: MessagesService, usersService: UsersService, jwtService: JwtService);
    private getUserIdFromSocket;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    handleJoinChat(client: Socket, chatId: string): void;
    handleEncryptedMsg(client: Socket, dto: SendEncryptedMessageDto): Promise<void>;
    onDelivered(dto: MessageDeliveredDto): Promise<void>;
    onSeen(dto: MessageSeenDto): Promise<void>;
    handleTyping(client: Socket, data: {
        chatId: string;
        userId: string;
    }): void;
    handleStopTyping(client: Socket, data: {
        chatId: string;
        userId: string;
    }): void;
    handleSendMedia(message: any): void;
    handleEditMessage(client: Socket, dto: EditMessageDto): Promise<void>;
    handleDeleteMessage(client: Socket, dto: DeleteMessageDto): Promise<void>;
}
