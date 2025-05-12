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

  it('should include security headers from helmet', async () => {
    const response = await request(app.getHttpServer()).get('/')
    expect(response.headers['content-security-policy']).toBe(
      "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
    )
    expect(response.headers['cross-origin-opener-policy']).toBe('same-origin')
    expect(response.headers['cross-origin-resource-policy']).toBe('same-origin')
    expect(response.headers['origin-agent-cluster']).toBe('?1')
    expect(response.headers['referrer-policy']).toBe('no-referrer')
    expect(response.headers['strict-transport-security']).toBe(
      'max-age=31536000; includeSubDomains',
    )
    expect(response.headers['x-content-type-options']).toBe('nosniff')
    expect(response.headers['x-dns-prefetch-control']).toBe('off')
    expect(response.headers['x-download-options']).toBe('noopen')
    expect(response.headers['x-frame-options']).toBe('SAMEORIGIN')
    expect(response.headers['x-permitted-cross-domain-policies']).toBe('none')
    expect(response.headers['x-powered-by']).toBe(undefined)
    expect(response.headers['x-xss-protection']).toBe('0')
  })

  it('should allow CORS', async () => {
    const response = await request(app.getHttpServer())
      .options('/')
      .set('Origin', 'http://example.com')
      .expect(204)

    expect(response.headers['access-control-allow-origin']).toBe('*')
    expect(response.headers['access-control-allow-methods']).toBe(
      'GET,HEAD,POST,DELETE',
    )
    expect(response.headers['access-control-allow-headers']).toBe(
      'Content-Type, Accept',
    )
  })

  it('should return 400 if Content-Type is not application/json', async () => {
    await request(app.getHttpServer())
      .post('/test-middleware')
      .set('Content-Type', 'text/plain') // Invalid Content-Type
      .send('Invalid payload')
      .expect(400)
      .expect('Only JSON is accepted')
  })

  it('should allow requests with Content-Type application/json', async () => {
    await request(app.getHttpServer())
      .post('/test-middleware')
      .set('Content-Type', 'application/json') // Valid Content-Type
      .send({ valid: 'payload' })
      .expect(404) // Assuming no handler is defined for this route
  })
})
