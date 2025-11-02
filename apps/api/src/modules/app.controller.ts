import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      name: 'HomeMatch API',
      version: '1.0.0',
      status: 'healthy',
      endpoints: [
        '/properties',
        '/applications',
        '/owners',
        '/payments',
        '/metrics'
      ]
    };
  }
}