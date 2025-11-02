
import { Controller, Get, Query } from '@nestjs/common';
import { PropertiesService } from './properties.service';

@Controller('properties')
export class PropertiesController {
  constructor(private svc: PropertiesService) {}

  @Get()
  list(@Query() q: any) { return this.svc.list(q); }
}
