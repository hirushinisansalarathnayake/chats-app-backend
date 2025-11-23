import { IsMongoId } from 'class-validator';

export class CreateChatDto {
  @IsMongoId()
  receiverId: string;
}
