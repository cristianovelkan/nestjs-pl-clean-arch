/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing'
import { TransactionsController } from './transactions.controller'
import { TransactionsService } from './transactions.service'
import { TransactionInMemoryRepository } from './../@core/infra/db/transaction-in-memory.repository'
import { CreateTransactionUseCase } from '../@core/application/create-transaction.use-case'
import { TransactionRepositoryInterface } from '../@core/domain/transaction.repository'
import { DeleteAllTransactionsUseCase } from '../@core/application/delete-all-transactions.use-case'
import { GetStatisticsUseCase } from '../@core/application/get-statistics.use-case'

describe('TransactionsController', () => {
  let controller: TransactionsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile()

    controller = module.get<TransactionsController>(TransactionsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create a transaction', async () => {
    const createTransactionDto = {
      amount: 100,
      timestamp: new Date(),
    }

    const validationSpy = jest.spyOn(controller, 'create')
    const result = await controller.create(createTransactionDto)

    expect(validationSpy).toHaveBeenCalledWith(createTransactionDto)
    expect(validationSpy).toHaveBeenCalledTimes(1)
    expect(result).toBeDefined()
    expect(result.amount).toEqual(createTransactionDto.amount)
    expect(result.timestamp).toEqual(createTransactionDto.timestamp)
  })

  it('should fail to create a transaction with invalid amount', async () => {
    const createTransactionDto = {
      amount: -100,
      timestamp: new Date(),
    }

    const validationSpy = jest.spyOn(controller, 'create')
    await expect(controller.create(createTransactionDto)).rejects.toThrow(
      'Transaction amount cannot be negative.',
    )
    expect(validationSpy).toHaveBeenCalledWith(createTransactionDto)
    expect(validationSpy).toHaveBeenCalledTimes(1)
  })

  it('should fail to create a transaction with invalid timestamp', async () => {
    const createTransactionDto = {
      amount: 100,
      timestamp: new Date('Invalid Date'),
    }

    const validationSpy = jest.spyOn(controller, 'create')
    await expect(controller.create(createTransactionDto)).rejects.toThrow(
      'Transaction timestamp must be valid.',
    )
    expect(validationSpy).toHaveBeenCalledWith(createTransactionDto)
    expect(validationSpy).toHaveBeenCalledTimes(1)
  })

  it('should fail to create a transaction with future timestamp', async () => {
    const createTransactionDto = {
      amount: 100,
      timestamp: new Date(Date.now() + 1000),
    }

    const validationSpy = jest.spyOn(controller, 'create')
    await expect(controller.create(createTransactionDto)).rejects.toThrow(
      'Transaction timestamp cannot be in the future.',
    )
    expect(validationSpy).toHaveBeenCalledWith(createTransactionDto)
    expect(validationSpy).toHaveBeenCalledTimes(1)
  })

  it('should get statistics', async () => {
    const result = await controller.statistics()
    expect(result).toBeDefined()
    expect(result).toHaveProperty('count')
    expect(result.count).toBeGreaterThanOrEqual(0)
    expect(result).toHaveProperty('sum')
    expect(result.sum).toBeGreaterThanOrEqual(0)
    expect(result).toHaveProperty('avg')
    expect(result.avg).toBeGreaterThanOrEqual(0)
    expect(result).toHaveProperty('min')
    expect(result.min).toBeGreaterThanOrEqual(0)
    expect(result).toHaveProperty('max')
    expect(result.max).toBeGreaterThanOrEqual(0)
  })

  it('should delete all transactions', async () => {
    const result = await controller.deleteAll()
    expect(result).toBeUndefined()
  })
})
