
import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('applications')
export class ApplicationsController {
  constructor(private prisma: PrismaService) {}

  @Get('by-property')
  async byProperty(@Query('propertyId') propertyId: string) {
    if (!propertyId) return [];
    return this.prisma.application.findMany({
      where: { propertyId },
      include: { renter: { select: { id: true, name: true, email: true } }, bgCheck: { select: { status: true } } },
      orderBy: { submittedAt: 'desc' }
    });
  }
}
