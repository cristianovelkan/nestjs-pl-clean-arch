/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from './app.module'
import helmet from 'helmet'
import { JSONMiddleware } from './middlewares/json.middleware'

describe('Integration Tests (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.use(helmet())
    app.enableCors({
      allowedHeaders: 'Content-Type, Accept',
      methods: 'GET,HEAD,POST,DELETE',
    })
    app.useGlobalPipes(
      new ValidationPipe({
        errorHttpStatusCode: 422,
      }),
    )

    const jsonMiddleware = new JSONMiddleware()
    app.use('/test-middleware', (req, res, next) =>
      jsonMiddleware.use(req, res, next),
    )

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should respond to GET / with 404 (assuming no root route exists)', async () => {
    await request(app.getHttpServer()).get('/').expect(404)
  })
})
