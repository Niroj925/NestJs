import { Controller, Post,Req ,Body, ParseIntPipe} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { AuthDto } from "./dto";


@Controller('auth') 

export class AuthController{
    constructor(private authService:AuthService){}
       
        @Post('signup')
        signup( @Body() dto:AuthDto ){ 
            return this.authService.signUp(dto);
        }

        @Post('signin')
        signin(@Body() dto:AuthDto ){
            console.log(dto);
            return this.authService.SignIn(dto);
        }

        

}