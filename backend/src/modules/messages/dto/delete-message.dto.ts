import { IsString, IsBoolean } from 'class-validator';

export class DeleteMessageDto {
  @IsString()
  messageId: string;

  @IsBoolean()
  deleteForEveryone: boolean;
}
