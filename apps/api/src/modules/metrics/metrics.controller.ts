import { Controller, Get } from '@nestjs/common';
import * as promClient from 'prom-client';

@Controller('metrics')
export class MetricsController {
  @Get()
  async getMetrics() {
    const register = promClient.register;
    return await register.metrics();
  }
}