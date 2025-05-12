import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'
import { ApiProperty } from '@nestjs/swagger'

class CreateTransactionDto {
  @ApiProperty({
    example: 100,
    description: 'The amount of the transaction. Must be a positive number.',
  })
  amount: number

  @ApiProperty({
    example: '2025-05-12T10:00:00Z',
    description: 'The timestamp of the transaction in ISO 8601 format.',
  })
  timestamp: Date
}

export function ApiTransactionsPost(): MethodDecorator {
  return function (
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ): void {
    ApiOperation({
      summary: 'Create a new transaction',
      description: 'Create a new transaction with amount and timestamp given',
    })(target, propertyKey, descriptor)

    ApiBody({
      description: 'The transaction details to create',
      type: CreateTransactionDto,
      examples: {
        valid: {
          summary: 'Valid transaction',
          value: {
            amount: 100,
            timestamp: '2025-05-12T10:00:00Z',
          },
        },
        invalidAmount: {
          summary: 'Invalid transaction (negative amount)',
          value: {
            amount: -100,
            timestamp: '2025-05-12T10:00:00Z',
          },
        },
        invalidTimestamp: {
          summary: 'Invalid transaction (invalid timestamp)',
          value: {
            amount: 100,
            timestamp: 'Invalid Date',
          },
        },
      },
    })(target, propertyKey, descriptor)

    ApiResponse({
      status: 201,
      description: 'Transaction created successfully',
      schema: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The ID of the created transaction',
          },
          amount: {
            type: 'number',
            description: 'The amount of the transaction',
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            description: 'The timestamp of the transaction',
          },
        },
      },
    })(target, propertyKey, descriptor)

    ApiResponse({
      status: 422,
      description: 'Transaction amount must be a valid number.',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'array',
            example: [
              'Transaction amount cannot be negative.',
              'Transaction timestamp must be a valid date.',
              'Transaction timestamp cannot be in the future.',
            ],
            description: 'Validation error messages',
          },
        },
      },
    })(target, propertyKey, descriptor)

    ApiResponse({
      status: 500,
      description: 'Internal server error',
      schema: {
        type: 'object',
        properties: {
          message: {
            description: 'Error message',
            type: 'string',
          },
        },
      },
    })(target, propertyKey, descriptor)
  }
}
