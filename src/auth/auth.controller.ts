import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from '../auth/dto/register-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() registerDto: RegisterUserDto) {
        try {
            const user = await this.authService.register(registerDto);
            return { userId: user.id };
        } catch (error) {
            throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST);
        }
    }
}
