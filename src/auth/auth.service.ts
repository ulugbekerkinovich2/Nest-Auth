import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';  // Import the User type
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async register(registerDto: RegisterUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        return this.prisma.user.create({
            data: {
                email: registerDto.email,
                password: hashedPassword,
            },
        });
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
