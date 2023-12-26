import { Controller,Req,Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { userInfo } from 'os';
import { jwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {

    @UseGuards(jwtGuard)//for token validation
    @Get('me')
    getMe(@Req() req:Request){
     return req.user;
    }
}
