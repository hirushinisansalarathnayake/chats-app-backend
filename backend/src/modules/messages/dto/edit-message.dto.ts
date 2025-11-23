import { IsString } from 'class-validator';

export class EditMessageDto {
  @IsString()
  messageId: string;

  @IsString()
  newText: string;
}
