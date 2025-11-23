import { Chat } from './schemas/chat.schema';
import { Model } from 'mongoose';
import { RemoveMemberDto } from './dto/remove-member.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { CreateGroupDto } from './dto/create-group.dto';
export declare class ChatsService {
    private chatModel;
    constructor(chatModel: Model<Chat>);
    createChat(userId: string, receiverId: string): Promise<import("mongoose").Document<unknown, {}, Chat, {}, {}> & Chat & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getMyChats(userId: string): Promise<(import("mongoose").FlattenMaps<Chat> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    createGroup(dto: CreateGroupDto): Promise<import("mongoose").Document<unknown, {}, Chat, {}, {}> & Chat & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    addMember(dto: AddMemberDto): Promise<(import("mongoose").Document<unknown, {}, Chat, {}, {}> & Chat & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    removeMember(dto: RemoveMemberDto): Promise<(import("mongoose").Document<unknown, {}, Chat, {}, {}> & Chat & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    getGroupDetails(chatId: string): Promise<(import("mongoose").FlattenMaps<Chat> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
