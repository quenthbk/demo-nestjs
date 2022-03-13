import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { StatusHealth } from './health/service.health';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/status')
  getStatus(): StatusHealth {
    return {
      status: 'ok',
      version: '2.9.4'
    }
  }
}
