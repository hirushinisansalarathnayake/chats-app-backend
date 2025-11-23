import { Controller, Get, Patch, Req, Body, UseGuards, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { RegisterKeyDto } from './dto/register-key.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  getMe(@Req() req) {
    return this.usersService.getMe(req.user.id);
  }

  @Patch('update')
updateProfile(@Req() req, @Body() dto: UpdateProfileDto) {
  return this.usersService.updateProfile(req.user.id, dto);
}

@Post('keys/register')
registerKey(@Req() req, @Body() dto: RegisterKeyDto) {
  return this.usersService.registerDeviceKey(req.user.id, dto);
}

@Get('keys/:userId')
getKeys(@Param('userId') userId: string) {
  return this.usersService.getDeviceKeys(userId);
}
@Get()
getAllUsers(@Req() req) {
  return this.usersService.getAllUsers(req.user.id);
}


}
