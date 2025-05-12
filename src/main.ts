import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Transactions')
    .setDescription('Documentation - transaction.com.br')
    .setVersion('1.0')
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig)

  SwaggerModule.setup('api', app, documentFactory)

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
  await app.listen(process.env.PORT ?? 3000)
}
void bootstrap()
