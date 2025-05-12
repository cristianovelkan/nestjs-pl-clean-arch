import { ApiOperation, ApiResponse } from '@nestjs/swagger'

export function ApiStatisticsGet(): MethodDecorator {
  return function (
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ): void {
    ApiOperation({
      summary: 'Get transaction statistics for the last 60 seconds',
      description: 'Get statistics of transactions',
    })(target, propertyKey, descriptor)
    ApiResponse({
      status: 200,
      description: 'Statistics retrieved successfully',
      schema: {
        type: 'object',
        properties: {
          count: {
            type: 'number',
            example: 100,
          },
          sum: {
            type: 'number',
            example: 1000,
          },
          avg: {
            type: 'number',
            example: 10,
          },
          min: {
            type: 'number',
            example: 1,
          },
          max: {
            type: 'number',
            example: 100,
          },
        },
      },
    })(target, propertyKey, descriptor)
    ApiResponse({
      status: 500,
      description: 'Internal server error',
    })(target, propertyKey, descriptor)
  }
}
