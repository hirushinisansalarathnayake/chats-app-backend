import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class SendMessageDto {
  @IsMongoId()
  chatId: string;

  @IsString()
  @IsOptional()
  text?: string;

  @IsString()
  @IsOptional()
  mediaUrl?: string;

  @IsString()
  @IsOptional()
  mediaType?: string; 
}
