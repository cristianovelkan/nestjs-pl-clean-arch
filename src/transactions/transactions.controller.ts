import { Controller, Get, Post, Body, Delete } from '@nestjs/common'
import { TransactionsService } from './transactions.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'

@Controller()
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post('/transactions')
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<any> {
    const result = await this.transactionsService.create(createTransactionDto)
    return result
  }

  @Get('/statistics')
  statistics() {
    return this.transactionsService.statistics()
  }

  @Delete('/transactions')
  deleteAll() {
    return this.transactionsService.deleteAll()
  }
}
