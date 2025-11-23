import { Document, Types } from 'mongoose';
export declare class Message extends Document {
    chatId: Types.ObjectId;
    senderId: Types.ObjectId;
    ciphertext: string | null;
    nonce: string | null;
    senderEphemeralPub: string | null;
    senderDeviceId: string | null;
    algorithm: string;
    isEdited: boolean;
    isDeleted: boolean;
    deliveredAt: Date | null;
    seenAt: Date | null;
    mediaUrl: string | null;
    mediaType: string | null;
    editedAt: Date | null;
    deletedFor: string[];
    isDeletedForEveryone: boolean;
}
export declare const MessageSchema: import("mongoose").Schema<Message, import("mongoose").Model<Message, any, any, any, Document<unknown, any, Message, any, {}> & Message & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Message, Document<unknown, {}, import("mongoose").FlatRecord<Message>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Message> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
