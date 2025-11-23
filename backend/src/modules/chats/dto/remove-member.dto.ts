import { IsString } from 'class-validator';

export class RemoveMemberDto {
  @IsString()
  chatId: string;

  @IsString()
  userId: string; 
}
