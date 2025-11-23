import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/user.schema';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    signup(dto: SignupDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
        profileImage: string;
        about: string;
        token: string;
    }>;
    login(dto: LoginDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
        profileImage: string;
        about: string;
        token: string;
    }>;
    getProfile(userId: string): Promise<(import("mongoose").FlattenMaps<User> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    buildUserResponse(user: User): {
        _id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
        profileImage: string;
        about: string;
        token: string;
    };
}
