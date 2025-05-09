import { TransactionRepositoryInterface } from '../domain/transaction.repository'

export class DeleteAllTransactionsUseCase {
  constructor(private transactionRepo: TransactionRepositoryInterface) {}

  async execute(): Promise<void> {
    await this.transactionRepo.deleteAll()
  }
}
