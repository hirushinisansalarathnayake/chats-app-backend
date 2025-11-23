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
exports.MessagesGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const messages_service_1 = require("./messages.service");
const send_encrypted_message_dto_1 = require("./dto/send-encrypted-message.dto");
const message_delivered_dto_1 = require("./dto/message-delivered.dto");
const message_seen_dto_1 = require("./dto/message-seen.dto");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const delete_message_dto_1 = require("./dto/delete-message.dto");
const edit_message_dto_1 = require("./dto/edit-message.dto");
let MessagesGateway = class MessagesGateway {
    messagesService;
    usersService;
    jwtService;
    server;
    constructor(messagesService, usersService, jwtService) {
        this.messagesService = messagesService;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.messagesService.setGateway(this);
    }
    getUserIdFromSocket(client) {
        try {
            const token = client.handshake.auth.token;
            if (!token)
                return null;
            const decoded = this.jwtService.verify(token);
            return decoded.id;
        }
        catch (error) {
            console.log('Invalid token:', error.message);
            return null;
        }
    }
    async handleConnection(client) {
        const userId = this.getUserIdFromSocket(client);
        if (!userId)
            return;
        console.log(`User connected (online): ${userId}`);
        await this.usersService.setOnline(userId);
        this.server.emit('userOnline', { userId });
    }
    async handleDisconnect(client) {
        const userId = this.getUserIdFromSocket(client);
        if (!userId)
            return;
        console.log(`User disconnected (offline): ${userId}`);
        const user = await this.usersService.setOffline(userId);
        this.server.emit('userOffline', {
            userId,
            lastSeen: user?.lastSeen || new Date(),
        });
    }
    handleJoinChat(client, chatId) {
        client.join(chatId);
        console.log(` ${client.id} joined room: ${chatId}`);
    }
    async handleEncryptedMsg(client, dto) {
        const senderId = dto.senderId;
        await this.messagesService.sendEncryptedMessage(senderId, dto);
    }
    async onDelivered(dto) {
        await this.messagesService.markDelivered(dto.messageId);
    }
    async onSeen(dto) {
        await this.messagesService.markSeen(dto.messageId);
    }
    handleTyping(client, data) {
        client.to(data.chatId).emit('typing', {
            userId: data.userId,
            chatId: data.chatId,
            isTyping: true,
        });
    }
    handleStopTyping(client, data) {
        client.to(data.chatId).emit('typing', {
            userId: data.userId,
            chatId: data.chatId,
            isTyping: false,
        });
    }
    handleSendMedia(message) {
        this.server.to(message.chatId).emit('newMediaMessage', message);
    }
    async handleEditMessage(client, dto) {
        const userId = this.getUserIdFromSocket(client);
        if (!userId)
            return;
        await this.messagesService.editMessage(userId, dto);
    }
    async handleDeleteMessage(client, dto) {
        const userId = this.getUserIdFromSocket(client);
        if (!userId)
            return;
        await this.messagesService.deleteMessage(userId, dto);
    }
};
exports.MessagesGateway = MessagesGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessagesGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinChat'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], MessagesGateway.prototype, "handleJoinChat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendEncryptedMessage'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        send_encrypted_message_dto_1.SendEncryptedMessageDto]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleEncryptedMsg", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('messageDelivered'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_delivered_dto_1.MessageDeliveredDto]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "onDelivered", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('messageSeen'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_seen_dto_1.MessageSeenDto]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "onSeen", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], MessagesGateway.prototype, "handleTyping", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('stopTyping'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], MessagesGateway.prototype, "handleStopTyping", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMedia'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MessagesGateway.prototype, "handleSendMedia", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('editMessage'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        edit_message_dto_1.EditMessageDto]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleEditMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('deleteMessage'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        delete_message_dto_1.DeleteMessageDto]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleDeleteMessage", null);
exports.MessagesGateway = MessagesGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: '*' },
        transports: ['websocket', 'polling'],
        path: '/socket.io',
    }),
    __metadata("design:paramtypes", [messages_service_1.MessagesService,
        users_service_1.UsersService,
        jwt_1.JwtService])
], MessagesGateway);
//# sourceMappingURL=messages.gateway.js.map