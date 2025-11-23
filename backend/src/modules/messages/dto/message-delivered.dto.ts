import { IsString } from 'class-validator';

export class MessageDeliveredDto {
  @IsString()
  messageId: string;

  @IsString()
  chatId: string;
}
