import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { User, UserData } from './types/types';

@Injectable()
export class AuthService {
  private loadUsers(): User[] {
    const dataPath = path.join(process.cwd(), 'data', 'user.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data: UserData = JSON.parse(rawData);
    return data.users;
  }

  login(credentials: LoginDto): LoginResponseDto {
    const user = this.loadUsers().find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password,
    );

    if (!user || !user.isAdmin) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return {
      username: user.username,
      isAdmin: user.isAdmin,
    };
  }
}
