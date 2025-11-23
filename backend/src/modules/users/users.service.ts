import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getMe(userId: string) {
    return this.userModel
      .findById(userId)
      .select('-password')   // never return password
      .lean();
  }
  async updateProfile(userId: string, dto: any) {
  return this.userModel
    .findByIdAndUpdate(userId, dto, { new: true })
    .select('-password')
    .lean();
}

async registerDeviceKey(userId: string, dto: any) {
  return this.userModel.findByIdAndUpdate(
    userId,
    {
      $push: {
        devices: {
          deviceId: dto.deviceId,
          publicKey: dto.publicKey,
          label: dto.label,
        },
      },
    },
    { new: true },
  );
}

async getDeviceKeys(userId: string) {
  const user = await this.userModel.findById(userId).select('devices');
  return user?.devices || [];
}
async setOnline(userId: string) {
  return this.userModel.findByIdAndUpdate(
    userId,
    { isOnline: true },
    { new: true }
  );
}

async setOffline(userId: string) {
  return this.userModel.findByIdAndUpdate(
    userId,
    {
      isOnline: false,
      lastSeen: new Date(),
    },
    { new: true }
  );
}

async getAllUsers(currentUserId: string) {
  return this.userModel
    .find(
      { _id: { $ne: currentUserId } },
      { password: 0 }
    )
    .lean();
}


}
