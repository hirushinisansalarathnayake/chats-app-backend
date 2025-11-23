import { IsString } from 'class-validator';

export class SendEncryptedMessageDto {
  @IsString()
  chatId: string;

  @IsString()
  ciphertext: string;

  @IsString()
  nonce: string;

  @IsString()
  senderEphemeralPub: string;

  @IsString()
  senderDeviceId: string;

  @IsString()
  senderId: string; 
}
