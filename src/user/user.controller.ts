import { Controller,Req,Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { userInfo } from 'os';

@Controller('user')
export class UserController {

    @UseGuards(AuthGuard('jwt'))//for token validation
    @Get('me')
    getMe(@Req() req:Request){
     console.log({
        user:req.user
     });
     return req.user;
    }
}
