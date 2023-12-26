import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import *as argon from "argon2";
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { error } from "console";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { promises } from "dns";

@Injectable({})

export class AuthService{

    constructor(
        private prisma :PrismaService,
        private jwt:JwtService,
        private config:ConfigService
        ){}
 
    async SignIn(dto: AuthDto) {

        try{
        const user=await this .prisma.user.findUnique({
            where:{
                email:dto.email
            }
        });

        if(!user){
            throw new ForbiddenException("Invalid credentials");
        }

        const isCorrect=await argon.verify(user.hash,dto.password);

        if(!isCorrect){
            throw new ForbiddenException('Invalid credentials');
        }
        return this.signToken(user.id,user.email);
    }catch(error){
        if(
            error instanceof
            PrismaClientKnownRequestError
        ){
            if(error.code === 'P2002'){
                throw new ForbiddenException(
                    'Invalid credentials'
                )
            }
        }
    }
    }

   async signUp(dto:AuthDto){
    try{
        const hash = await argon.hash(dto.password);
        const user = await this.prisma.user.create({ // Use your actual model name here
            data: {
                email: dto.email,
                hash,
                firstName:dto.firstName
            },
            // select:{
            //     id:true,
            //     email:true,
            //     firstName:true,
            //     createdAt:true
            // }
        });

        delete user.hash
        return user;
    }catch(error){
       if(
        error instanceof 
        PrismaClientKnownRequestError
        ){
            if(error.code === "P2002"){
                throw new ForbiddenException(
                    'Credentials taken',
                );
            }
        }
        throw error;
    }
}

//to generate jwt token
 async signToken(
    userId:number,
    email:string
    ):Promise<{access_token: string}>{
        const payload={
            sub:userId,
            email
        }

        const secret=this.config.get('JWT_SECRET');

         const token=await this.jwt.signAsync(payload,{
            expiresIn:"30m",
            secret:secret,
        })

        return {
            access_token:token
        }
}

}