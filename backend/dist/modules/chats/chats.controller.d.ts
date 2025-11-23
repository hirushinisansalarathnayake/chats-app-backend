import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { RemoveMemberDto } from './dto/remove-member.dto';
export declare class ChatsController {
    private chatsService;
    constructor(chatsService: ChatsService);
    createChat(req: any, dto: CreateChatDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/chat.schema").Chat, {}, {}> & import("./schemas/chat.schema").Chat & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    createGroup(req: any, dto: CreateGroupDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/chat.schema").Chat, {}, {}> & import("./schemas/chat.schema").Chat & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    addMember(dto: AddMemberDto): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/chat.schema").Chat, {}, {}> & import("./schemas/chat.schema").Chat & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    removeMember(dto: RemoveMemberDto): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/chat.schema").Chat, {}, {}> & import("./schemas/chat.schema").Chat & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    getMyChats(req: any): Promise<(import("mongoose").FlattenMaps<import("./schemas/chat.schema").Chat> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getGroupDetails(chatId: string): Promise<(import("mongoose").FlattenMaps<import("./schemas/chat.schema").Chat> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
