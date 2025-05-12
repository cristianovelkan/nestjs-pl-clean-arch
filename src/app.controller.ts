import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiHealthGet } from './transactions/docs/health.swagger'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiHealthGet()
  @Get('/health')
  health() {
    return this.appService.getHealth()
  }
}
