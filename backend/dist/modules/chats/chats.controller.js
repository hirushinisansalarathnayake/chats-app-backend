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
exports.ChatsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../core/guards/jwt-auth.guard");
const chats_service_1 = require("./chats.service");
const create_chat_dto_1 = require("./dto/create-chat.dto");
const create_group_dto_1 = require("./dto/create-group.dto");
const add_member_dto_1 = require("./dto/add-member.dto");
const remove_member_dto_1 = require("./dto/remove-member.dto");
let ChatsController = class ChatsController {
    chatsService;
    constructor(chatsService) {
        this.chatsService = chatsService;
    }
    createChat(req, dto) {
        return this.chatsService.createChat(req.user.id, dto.receiverId);
    }
    createGroup(req, dto) {
        return this.chatsService.createGroup({
            ...dto,
            creatorId: req.user.id,
        });
    }
    addMember(dto) {
        return this.chatsService.addMember(dto);
    }
    removeMember(dto) {
        return this.chatsService.removeMember(dto);
    }
    getMyChats(req) {
        return this.chatsService.getMyChats(req.user.id);
    }
    getGroupDetails(chatId) {
        return this.chatsService.getGroupDetails(chatId);
    }
};
exports.ChatsController = ChatsController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_chat_dto_1.CreateChatDto]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "createChat", null);
__decorate([
    (0, common_1.Post)('group/create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_group_dto_1.CreateGroupDto]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "createGroup", null);
__decorate([
    (0, common_1.Post)('group/add-member'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_member_dto_1.AddMemberDto]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "addMember", null);
__decorate([
    (0, common_1.Post)('group/remove-member'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_member_dto_1.RemoveMemberDto]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "removeMember", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "getMyChats", null);
__decorate([
    (0, common_1.Get)('group/:chatId'),
    __param(0, (0, common_1.Param)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatsController.prototype, "getGroupDetails", null);
exports.ChatsController = ChatsController = __decorate([
    (0, common_1.Controller)('chats'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [chats_service_1.ChatsService])
], ChatsController);
//# sourceMappingURL=chats.controller.js.map