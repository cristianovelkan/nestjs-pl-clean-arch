import { TransactionRepositoryInterface } from '../domain/transaction.repository'

export class GetStatisticsUseCase {
  constructor(private transactionRepo: TransactionRepositoryInterface) {}

  async execute(): Promise<GetStatisticsOutput> {
    const now = Date.now()
    const sixtySecondsAgo = now - 60000

    const transactions = await this.transactionRepo.findAll()
    const recentTransactions = transactions.filter(
      (tx: { timestamp: Date }) => {
        const txTime = new Date(tx.timestamp).getTime()
        return txTime >= sixtySecondsAgo && txTime <= now
      },
    )

    const amounts = recentTransactions.map(
      (tx: { amount: number }) => tx.amount,
    )

    if (amounts.length === 0) {
      return { count: 0, sum: 0, avg: 0, min: 0, max: 0 }
    }

    const sum = amounts.reduce((acc: number, val: number) => acc + val, 0)
    const count = amounts.length
    const avg = sum / count
    const min = Math.min(...amounts)
    const max = Math.max(...amounts)

    return { count, sum, avg, min, max }
  }
}

type GetStatisticsOutput = {
  count: number
  sum: number
  avg: number
  min: number
  max: number
}
