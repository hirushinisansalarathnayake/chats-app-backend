import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';
import { Chat } from '../chats/schemas/chat.schema';
import { SendEncryptedMessageDto } from './dto/send-encrypted-message.dto';
import { UploadMediaDto } from './dto/upload-media.dto';
import { EditMessageDto } from './dto/edit-message.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';
export declare class MessagesService {
    private messageModel;
    private chatModel;
    private gateway;
    constructor(messageModel: Model<Message>, chatModel: Model<Chat>);
    setGateway(gateway: any): void;
    sendEncryptedMessage(userId: string, dto: SendEncryptedMessageDto): Promise<import("mongoose").Document<unknown, {}, Message, {}, {}> & Message & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getMessages(chatId: string): Promise<(import("mongoose").FlattenMaps<Message> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    markDelivered(messageId: string): Promise<(import("mongoose").Document<unknown, {}, Message, {}, {}> & Message & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    markSeen(messageId: string): Promise<(import("mongoose").Document<unknown, {}, Message, {}, {}> & Message & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    handleMediaMessage(dto: UploadMediaDto, file: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, Message, {}, {}> & Message & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    editMessage(userId: string, dto: EditMessageDto): Promise<import("mongoose").Document<unknown, {}, Message, {}, {}> & Message & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    deleteMessage(userId: string, dto: DeleteMessageDto): Promise<import("mongoose").Document<unknown, {}, Message, {}, {}> & Message & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
