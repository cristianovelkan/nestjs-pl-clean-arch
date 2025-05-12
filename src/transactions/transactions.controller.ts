import { Controller, Get, Post, Body, Delete } from '@nestjs/common'
import { TransactionsService } from './transactions.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { ApiTransactionsPost } from './docs/create-transaction.swagger'
import { ApiStatisticsGet } from './docs/statistics.swagger'

@Controller()
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @ApiTransactionsPost()
  @Post('/transactions')
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<any> {
    const result = await this.transactionsService.create(createTransactionDto)
    return result
  }

  @Get('/statistics')
  @ApiStatisticsGet()
  statistics() {
    return this.transactionsService.statistics()
  }

  @Delete('/transactions')
  deleteAll() {
    return this.transactionsService.deleteAll()
  }
}
