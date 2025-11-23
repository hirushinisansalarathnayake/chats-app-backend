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
exports.MessagesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../core/guards/jwt-auth.guard");
const messages_service_1 = require("./messages.service");
const send_encrypted_message_dto_1 = require("./dto/send-encrypted-message.dto");
const common_2 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const local_storage_1 = require("../../infrastructure/storage/local.storage");
const upload_media_dto_1 = require("./dto/upload-media.dto");
const edit_message_dto_1 = require("./dto/edit-message.dto");
const delete_message_dto_1 = require("./dto/delete-message.dto");
let MessagesController = class MessagesController {
    messagesService;
    constructor(messagesService) {
        this.messagesService = messagesService;
    }
    getMessages(chatId) {
        return this.messagesService.getMessages(chatId);
    }
    sendEncrypted(req, dto) {
        return this.messagesService.sendEncryptedMessage(req.user.id, dto);
    }
    async uploadMedia(file, dto) {
        return this.messagesService.handleMediaMessage(dto, file);
    }
    editMessage(req, dto) {
        return this.messagesService.editMessage(req.user.id, dto);
    }
    deleteMessage(req, dto) {
        return this.messagesService.deleteMessage(req.user.id, dto);
    }
};
exports.MessagesController = MessagesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Post)('send-encrypted'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, send_encrypted_message_dto_1.SendEncryptedMessageDto]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "sendEncrypted", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_2.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: local_storage_1.LocalStorage })),
    __param(0, (0, common_2.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upload_media_dto_1.UploadMediaDto]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "uploadMedia", null);
__decorate([
    (0, common_1.Post)('edit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, edit_message_dto_1.EditMessageDto]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "editMessage", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, delete_message_dto_1.DeleteMessageDto]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "deleteMessage", null);
exports.MessagesController = MessagesController = __decorate([
    (0, common_1.Controller)('messages'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessagesController);
//# sourceMappingURL=messages.controller.js.map