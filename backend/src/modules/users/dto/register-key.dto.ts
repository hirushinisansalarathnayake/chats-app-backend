import { IsString } from 'class-validator';

export class RegisterKeyDto {
  @IsString()
  deviceId: string;

  @IsString()
  publicKey: string;

  @IsString()
  label: string;
}
