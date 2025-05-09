import { TransactionEntity } from '../domain/transaction.entity'
import { TransactionRepositoryInterface } from '../domain/transaction.repository'

export class CreateTransactionUseCase {
  constructor(private transactionRepo: TransactionRepositoryInterface) {}

  async execute(
    input: CreateTransactionInput,
  ): Promise<CreateTransactionOutput> {
    const transaction = new TransactionEntity(input)
    await this.transactionRepo.insert(transaction)
    return transaction.toJSON()
  }
}

type CreateTransactionInput = {
  amount: number
  timestamp: Date
}

type CreateTransactionOutput = {
  id: string
  amount: number
  timestamp: Date
}
