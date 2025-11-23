import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Chat', required: true })
  chatId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  senderId: Types.ObjectId;

  // allow null after deleteForEveryone
  @Prop({ type: String, default: null })
  ciphertext: string | null;

  @Prop({ type: String, default: null })
  nonce: string | null;

  @Prop({ type: String, default: null })
  senderEphemeralPub: string | null;

  @Prop({ type: String, default: null })
  senderDeviceId: string | null;

  @Prop({ default: 'x25519-xsalsa20poly1305' })
  algorithm: string;

  @Prop({ default: false })
  isEdited: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deliveredAt: Date | null;

  @Prop({ type: Date, default: null })
  seenAt: Date | null;

  @Prop({ type: String, default: null })
  mediaUrl: string | null;

  @Prop({ type: String, default: null })
  mediaType: string | null; 

  @Prop({ type: Date, default: null })
  editedAt: Date | null;

  @Prop({ type: [String], default: [] })
  deletedFor: string[];

  @Prop({ type: Boolean, default: false })
  isDeletedForEveryone: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
