export declare class SendEncryptedMessageDto {
    chatId: string;
    ciphertext: string;
    nonce: string;
    senderEphemeralPub: string;
    senderDeviceId: string;
    senderId: string;
}
