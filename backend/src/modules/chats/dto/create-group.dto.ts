import { IsString, IsArray } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  groupName: string;

  @IsArray()
  members: string[]; 

  @IsString()
  creatorId: string;
}
