import { IsString } from "class-validator";

export class UploadMediaDto {
  @IsString()
  chatId: string;

  @IsString()
  senderId: string;
}
