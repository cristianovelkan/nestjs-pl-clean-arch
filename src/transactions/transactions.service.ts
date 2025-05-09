import { Injectable } from '@nestjs/common'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { CreateTransactionUseCase } from '../@core/application/create-transaction.use-case'
import { DeleteAllTransactionsUseCase } from '../@core/application/delete-all-transactions.use-case'
import { GetStatisticsUseCase } from '../@core/application/get-statistics.use-case'

@Injectable()
export class TransactionsService {
  constructor(
    private createUseCase: CreateTransactionUseCase,
    private deleteAllUseCase: DeleteAllTransactionsUseCase,
    private getStatisticsUseCase: GetStatisticsUseCase,
  ) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this.createUseCase.execute(createTransactionDto)
  }

  statistics() {
    return this.getStatisticsUseCase.execute()
  }

  deleteAll() {
    return this.deleteAllUseCase.execute()
  }
}
