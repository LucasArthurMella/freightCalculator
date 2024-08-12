import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByLogin(username);
    const isMatch = await bcrypt.compare(password, user?.hash);
    
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { id: user._id, login: user.login}

    return {
      acess_token: await this.jwtService.signAsync(payload)
    }
  }

}
