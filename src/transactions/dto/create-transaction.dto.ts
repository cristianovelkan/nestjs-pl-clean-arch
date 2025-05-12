/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsPositive, IsNumber, MaxDate, IsDate } from 'class-validator'
import { Transform } from 'class-transformer'
export class CreateTransactionDto {
  @IsPositive({ message: 'Transaction amount cannot be negative.' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Transaction amount must be a valid number.' },
  )
  amount: number

  @Transform(({ value }) => new Date(value))
  @IsDate({
    message: 'Transaction timestamp must be a valid date.',
  })
  @MaxDate(new Date(), {
    message: 'Transaction timestamp cannot be in the future.',
  })
  timestamp: Date
}
