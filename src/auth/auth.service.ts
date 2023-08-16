import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './entity/auth.entity';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    // fetch the user with the given email
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    // if no user is found, throw a party
    if (!user) {
      throw new NotFoundException(`no user found for email: ${email}`);
    }
    // check if the passoword is correct
    const isPasswordValid = user.password === password;
    // if password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('invalid password');
    }
    // generate a JWT containing the user's ID and return it
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
