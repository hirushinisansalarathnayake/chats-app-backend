import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { RegisterKeyDto } from './dto/register-key.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getMe(req: any): Promise<(import("mongoose").FlattenMaps<import("./schemas/user.schema").User> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    updateProfile(req: any, dto: UpdateProfileDto): Promise<(import("mongoose").FlattenMaps<import("./schemas/user.schema").User> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    registerKey(req: any, dto: RegisterKeyDto): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, {}> & import("./schemas/user.schema").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    getKeys(userId: string): Promise<{
        deviceId: string;
        publicKey: string;
        label: string;
        addedAt: Date;
    }[]>;
    getAllUsers(req: any): Promise<(import("mongoose").FlattenMaps<import("./schemas/user.schema").User> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
