import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { ServiceHealthIndicator } from './service.health';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: ServiceHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('microservice', 'http://localhost:3000/status'),
    ]);
  }

  @Get()
  @HealthCheck()
  checkMs() {

  }

}
