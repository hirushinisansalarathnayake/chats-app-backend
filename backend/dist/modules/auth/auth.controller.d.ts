import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    getProfile(req: any): Promise<(import("mongoose").FlattenMaps<import("../users/schemas/user.schema").User> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
