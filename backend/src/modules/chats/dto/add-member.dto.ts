import { IsString } from 'class-validator';

export class AddMemberDto {
  @IsString()
  chatId: string;

  @IsString()
  userId: string; 
}
