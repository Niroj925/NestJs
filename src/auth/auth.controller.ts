import { Controller, Post,Req ,Body, ParseIntPipe, HttpCode, HttpStatus} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { AuthDto } from "./dto";


@Controller('auth') 

export class AuthController{
    constructor(private authService:AuthService){}
       
        @HttpCode(HttpStatus.OK)//return sc 200
        @Post('signup')
        signup( @Body() dto:AuthDto ){ 
            return this.authService.signUp(dto);
        }
         
        @HttpCode(HttpStatus.OK)//return sc 201
        @Post('signin')
        signin(@Body() dto:AuthDto ){
            
            return this.authService.SignIn(dto);
        }

        

}