import { TransactionInMemoryRepository } from '../infra/db/transaction-in-memory.repository'
import { CreateTransactionUseCase } from './create-transaction.use-case'
import { GetStatisticsUseCase } from './get-statistics.use-case'

describe('GetStatisticsUseCase Tests', () => {
  it('should return statistics for transactions within the last minute', async () => {
    const repository = new TransactionInMemoryRepository()
    const createUseCase = new CreateTransactionUseCase(repository)
    const getStatisticsUseCase = new GetStatisticsUseCase(repository)

    // Create transactions
    await createUseCase.execute({
      amount: 100,
      timestamp: new Date(Date.now() - 30000),
    }) // 30 seconds ago
    await createUseCase.execute({
      amount: 200,
      timestamp: new Date(Date.now() - 40000),
    }) // 40 seconds ago
    await createUseCase.execute({
      amount: 300,
      timestamp: new Date(Date.now() - 70000),
    }) // 70 seconds ago (should not be included)

    const stats = await getStatisticsUseCase.execute()

    expect(stats.count).toBe(2)
    expect(stats.sum).toBe(300)
    expect(stats.avg).toBe(150)
    expect(stats.min).toBe(100)
    expect(stats.max).toBe(200)
  })

  it('should return zero statistics when no transactions are present', async () => {
    const repository = new TransactionInMemoryRepository()
    const getStatisticsUseCase = new GetStatisticsUseCase(repository)

    const stats = await getStatisticsUseCase.execute()

    expect(stats.count).toBe(0)
    expect(stats.sum).toBe(0)
    expect(stats.avg).toBe(0)
    expect(stats.min).toBe(0)
    expect(stats.max).toBe(0)
  })
})
