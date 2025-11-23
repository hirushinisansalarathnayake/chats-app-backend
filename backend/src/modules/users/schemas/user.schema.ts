import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'Hey there! I am using Chat App.' })
  about: string;

  @Prop({ default: '' })
  profileImage: string;

  @Prop({
  type: [
    {
      deviceId: { type: String },
      publicKey: { type: String }, // base64 key
      label: { type: String },
      addedAt: { type: Date, default: Date.now },
    },
  ],
  default: [],
})
devices: {
  deviceId: string;
  publicKey: string;
  label: string;
  addedAt: Date;
}[];
@Prop({ default: false })
isOnline: boolean;

@Prop({ type: Date, default: null })
lastSeen: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);
