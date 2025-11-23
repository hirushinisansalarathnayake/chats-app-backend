import { Document, Types } from 'mongoose';
export declare class Chat extends Document {
    participants: Types.ObjectId[];
    createdBy: Types.ObjectId;
    lastMessage: string;
    lastMessageAt: Date;
    isGroup: boolean;
    groupName: string;
    groupIcon: string;
    admins: string[];
    members: string[];
}
export declare const ChatSchema: import("mongoose").Schema<Chat, import("mongoose").Model<Chat, any, any, any, Document<unknown, any, Chat, any, {}> & Chat & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Chat, Document<unknown, {}, import("mongoose").FlatRecord<Chat>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Chat> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
