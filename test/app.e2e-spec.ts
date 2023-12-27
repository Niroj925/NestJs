import {Test} from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication,ValidationPipe } from '@nestjs/common';
import { AuthDto } from '../src/auth/dto';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';


describe('App e2e test',()=>{
  let app: INestApplication;
  let prisma:PrismaService

  beforeAll(async ()=>{
    const moduleRef =
    await Test.createTestingModule({
      imports:[AppModule],
    }).compile();

    app=moduleRef.createNestApplication();
    //for dto validation include globalpipes
    app.useGlobalPipes(
      new ValidationPipe({
      whitelist:true
    }),
    );
    await app.init();
    await app.listen(8848);

    pactum.request.setBaseUrl('http://localhost:8848')

    prisma=app.get(PrismaService)
     await prisma.cleanDb()
  });

  describe('Auth',()=>{
   const dto: AuthDto ={
          email:"nn@gmail.com",
          password:'thaodhg',
          firstName:"nnkjk"
        };
    describe('SignUp',()=>{
      it('should throw error if any email empty',()=>{
        return pactum
        .spec()
        .post(
          '/auth/signup'
        )
        .withBody({
          password:dto.password
        })
        .expectStatus(400)
        // .inspect()
      })

      it('should throw error if any password empty',()=>{
        return pactum
        .spec()
        .post(
          '/auth/signup'
        )
        .withBody({
          email:dto.email
        })
        .expectStatus(400)
        // .inspect()
      })

      it('this should pass', () => {
        return pactum
        .spec()
        .post(
          '/auth/signup'
        )
        .withBody(dto)
        .expectStatus(200)
        // .inspect()
      })
      });

       describe('SignIn',()=>{
        it('should throw error if email empty',()=>{
          return pactum
          .spec()
          .post(
            '/auth/signin'
          )
          .withBody({
            password:dto.password
          })
          .expectStatus(400)
          // .inspect()
        })
  
        it('should throw error if any password empty',()=>{
          return pactum
          .spec()
          .post(
            '/auth/signin'
          )
          .withBody({
            email:dto.email
          })
          .expectStatus(400)
          // .inspect()
        })
  
        it('this should pass', () => {
          return pactum
          .spec()
          .post(
            '/auth/signin'
          )
          .withBody(dto)
          .expectStatus(200)
          .inspect()
          .stores('userAt','access_token')
        })
    });

    describe('User',()=>{

      describe('get me',()=>{
        
      })
    })

    });

  afterAll(()=>{
    app.close();
  })


  it.todo('it should pass');
})