import { Module } from '@nestjs/common'
import { TransactionsService } from './transactions.service'
import { TransactionsController } from './transactions.controller'
import { TransactionInMemoryRepository } from '../@core/infra/db/transaction-in-memory.repository'
import { CreateTransactionUseCase } from '../@core/application/create-transaction.use-case'
import { TransactionRepositoryInterface } from '../@core/domain/transaction.repository'
import { DeleteAllTransactionsUseCase } from '../@core/application/delete-all-transactions.use-case'
import { GetStatisticsUseCase } from '../@core/application/get-statistics.use-case'

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    {
      provide: TransactionInMemoryRepository,
      useClass: TransactionInMemoryRepository,
    },
    {
      provide: CreateTransactionUseCase,
      useFactory: (transactionRepo: TransactionRepositoryInterface) => {
        return new CreateTransactionUseCase(transactionRepo)
      },
      inject: [TransactionInMemoryRepository],
    },
    {
      provide: DeleteAllTransactionsUseCase,
      useFactory: (transactionRepo: TransactionRepositoryInterface) => {
        return new DeleteAllTransactionsUseCase(transactionRepo)
      },
      inject: [TransactionInMemoryRepository],
    },
    {
      provide: GetStatisticsUseCase,
      useFactory: (transactionRepo: TransactionRepositoryInterface) => {
        return new GetStatisticsUseCase(transactionRepo)
      },
      inject: [TransactionInMemoryRepository],
    },
  ],
})
export class TransactionsModule {}
