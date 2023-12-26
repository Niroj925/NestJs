import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})

export class AuthService{

    constructor(private prisma :PrismaService){}
 
    logIn(){
       return {msg:"Hello I am Signed In"};
    }

    signUp(){
        return {msg:"Hello I am SignedUp"};
    }
}