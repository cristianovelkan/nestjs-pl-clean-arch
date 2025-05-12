import { Module, MiddlewareConsumer } from '@nestjs/common'
import { TransactionsModule } from './transactions/transactions.module'
import { ThrottlerModule } from '@nestjs/throttler'
import { JSONMiddleware } from './middlewares/json.middleware'
import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'
@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: () => ({
        level: process.env.LOG_LEVEL || 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
        defaultMeta: { service: 'transactions' },
        transports: [
          new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
          }),
          new winston.transports.File({ filename: 'logs/combined.log' }),
        ],
        exceptionHandlers: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.simple(),
            ),
          }),
          new winston.transports.File({
            filename: 'logs/uncaught_exceptions.log',
          }),
        ],
        rejectionHandlers: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.simple(),
            ),
          }),
          new winston.transports.File({
            filename: 'logs/unhandled_rejections.log',
          }),
        ],
      }),
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: Number(process.env.THROTTLE_TTL) || 60000,
          limit: Number(process.env.THROTTLE_LIMIT) || 60,
        },
      ],
    }),
    TransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JSONMiddleware).forRoutes('*')
  }
}
