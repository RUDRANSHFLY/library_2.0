import { INestApplication, ValidationPipe } from "@nestjs/common"
import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { DbService } from "src/db/db.service";
import * as pactum from "pactum"
import { AuthDto } from "src/auth/dto";
import { CreateBookDto, EditBookDto } from "src/book/dto";




describe('Ape e2e', () => {
  let app: INestApplication;
  let prisma: DbService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      })
    );
    await app.init()
    await app.listen(3333)

    prisma = app.get(DbService)
    await prisma.cleanDb()
    pactum.request.setBaseUrl("http://localhost:3333")
  });

  afterAll(() => app.close())
  it.todo('should pass')

  describe('Auth', () => {
    const dto: AuthDto = {
      email: "johon@gmail.com",
      password: "john123@"
    }
    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400)
      });


      it('should throw if body empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .expectStatus(400)
      });


      it('should register', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
      });


    });

    describe('SignIn', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400)
      });


      it('should throw if body empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .expectStatus(400)
      });

      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('token', 'access_token')
      });

    });


    describe('Book', () => {
      const dto: CreateBookDto = {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt, David Thomas",
        genre: "Programming",
        publishedYear: 1999,
        stockCount: 12,
        isbn: "978-0201616224"
      }

      describe('Get empty books', () => {
        it('should get empty books', () => {
          return pactum
            .spec()
            .get('/book')
            .withHeaders({
              Authorization: `Bearer $S{token}`
            })
            .expectStatus(200)
        });

        describe('Create book', () => {

          it('should create book', () => {
            return pactum
              .spec()
              .post('/book')
              .withBody(dto)
              .withHeaders({
                Authorization: `Bearer $S{token}`
              })
              .expectStatus(201)
          });

          it('should conflict already book exist', () => {
            return pactum
              .spec()
              .post('/book')
              .withBody(dto)
              .withHeaders({
                Authorization: `Bearer $S{token}`
              })
              .expectStatus(409)
          });

        })

        describe('Get books', () => {
          it('should book exist', () => {
            return pactum
              .spec()
              .get('/book')
              .withBody(dto)
              .withHeaders({
                Authorization: `Bearer $S{token}`
              })
              .expectStatus(200)
              .stores('bookId', 'books[0].id')
          });
        });

        describe('Get book by id', () => {
          it('should book exist by id', () => {
            return pactum
              .spec()
              .get('/book/{id}')
              .withPathParams('id', `$S{bookId}`)
              .withHeaders({
                Authorization: `Bearer $S{token}`
              })
              .expectStatus(200)
          });

          it('should empty book', () => {
            return pactum
              .spec()
              .get('/book/{id}')
              .withPathParams('id', '689abb48f58fde78db36b795')
              .withHeaders({
                Authorization: `Bearer $S{token}`
              })
              .expectStatus(404)
              .inspect()
          });
        });


        describe('Edit book by id', () => {
          const dto: EditBookDto = {
            stockCount: 10,
            publishedYear: 1234,
            title: "Ramayan",
            author: "vedvayas"
          }
          it('should update book by id', () => {
            return pactum
              .spec()
              .patch('/book/{id}')
              .withPathParams('id', `$S{bookId}`)
              .withBody(dto)
              .withHeaders({
                Authorization: `Bearer $S{token}`
              })
              .expectStatus(200)
          });
          it('should update empty book by id', () => {
            return pactum
              .spec()
              .patch('/book/{id}')
              .withPathParams('id', `689abb48f58fde78db36b795`)
              .withBody(dto)
              .withHeaders({
                Authorization: `Bearer $S{token}`
              })
              .expectStatus(403)
          });
        });


        describe('Delte book by id', () => {
          it('should delete book by id', () => {
            return pactum
              .spec()
              .delete('/book/{id}')
              .withPathParams('id', `$S{bookId}`)
              .withBody(dto)
              .withHeaders({
                Authorization: `Bearer $S{token}`
              })
              .expectStatus(204)
          });

           it('should delete empty book by id', () => {
            return pactum
              .spec()
              .delete('/book/{id}')
              .withPathParams('id', `689abb48f58fde78db36b795`)
              .withBody(dto)
              .withHeaders({
                Authorization: `Bearer $S{token}`
              })
              .expectStatus(403)
          });
        });


      
        





      })
    })
  })
})