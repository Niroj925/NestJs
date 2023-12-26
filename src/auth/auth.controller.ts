import { Controller, Post,Req ,Body, ParseIntPipe} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { AuthDto } from "./dto";


@Controller('auth') 

export class AuthController{
    constructor(private authService:AuthService){}
       
        @Post('signup')
        signup(

            @Body('email')
            email:String,

            @Body('password')
            password:String,

            dto:AuthDto){
            
            console.log({
                email,
                password
            });
            return this.authService.signUp();
        }

        @Post('signin')
        signin(){
            return this.authService.logIn();
        }

        

}