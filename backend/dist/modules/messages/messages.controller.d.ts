import { MessagesService } from './messages.service';
import { SendEncryptedMessageDto } from './dto/send-encrypted-message.dto';
import { UploadMediaDto } from './dto/upload-media.dto';
import { EditMessageDto } from './dto/edit-message.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';
export declare class MessagesController {
    private messagesService;
    constructor(messagesService: MessagesService);
    getMessages(chatId: string): Promise<(import("mongoose").FlattenMaps<import("./schemas/message.schema").Message> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    sendEncrypted(req: any, dto: SendEncryptedMessageDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/message.schema").Message, {}, {}> & import("./schemas/message.schema").Message & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    uploadMedia(file: Express.Multer.File, dto: UploadMediaDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/message.schema").Message, {}, {}> & import("./schemas/message.schema").Message & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    editMessage(req: any, dto: EditMessageDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/message.schema").Message, {}, {}> & import("./schemas/message.schema").Message & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    deleteMessage(req: any, dto: DeleteMessageDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/message.schema").Message, {}, {}> & import("./schemas/message.schema").Message & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
