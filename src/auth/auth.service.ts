import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import *as argon from "argon2";
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { error } from "console";

@Injectable({})

export class AuthService{

    constructor(private prisma :PrismaService){}
 
    async SignIn(dto: AuthDto) {

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

        delete user.hash

        return user;
       
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
}