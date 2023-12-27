import { Controller,Req,Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { userInfo } from 'os';
import { jwtGuard } from 'src/auth/guard';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
 
//token validation
@UseGuards(jwtGuard)//this is for all request 
@Controller('user')
export class UserController {

   @Get('me')
    //GetUser custome decorator
    getMe(
        @GetUser() user:User,
        @GetUser('email') email:string,
        ){
            console.log({
                email,
            })
     return user;
    }
}
