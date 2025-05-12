import { Module, MiddlewareConsumer } from '@nestjs/common'
import { TransactionsModule } from './transactions/transactions.module'
import { ThrottlerModule } from '@nestjs/throttler'
import { JSONMiddleware } from './middlewares/json.middleware'
@Module({
  imports: [
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
