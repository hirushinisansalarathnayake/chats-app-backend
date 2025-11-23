import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Chat extends Document {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
  participants: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  createdBy: Types.ObjectId;

  @Prop({ default: '' })
  lastMessage: string;

  @Prop({ default: Date.now })
  lastMessageAt: Date;
  @Prop({ default: false })
isGroup: boolean;

@Prop({ type: String, default: null })
groupName: string;

@Prop({ type: String, default: null })
groupIcon: string; 

@Prop({ type: [String], default: [] })
admins: string[]; 

@Prop({ type: [String], default: [] })
members: string[]; 

}

export const ChatSchema = SchemaFactory.createForClass(Chat);
