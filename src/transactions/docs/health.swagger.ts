import { ApiOperation, ApiResponse } from '@nestjs/swagger'

export function ApiHealthGet(): MethodDecorator {
  return function (
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ): void {
    ApiOperation({
      summary: 'Get api health data',
      description: 'Get health of the api',
    })(target, propertyKey, descriptor)
    ApiResponse({
      status: 200,
      description: 'Health retrieved successfully',
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'ok',
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            example: '2023-10-01T12:00:00Z',
          },
          uptime: {
            type: 'number',
            example: 2.5938969,
          },
          memoryUsage: {
            type: 'object',
            properties: {
              rss: {
                type: 'number',
                example: 123456789,
              },
              heapTotal: {
                type: 'number',
                example: 123456789,
              },
              heapUsed: {
                type: 'number',
                example: 123456789,
              },
              external: {
                type: 'number',
                example: 123456789,
              },
              arrayBuffers: {
                type: 'number',
                example: 123456789,
              },
            },
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
