
import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('owners')
export class OwnersController {
  constructor(private prisma: PrismaService) {}

  @Get(':id/properties')
  async properties(@Param('id') id: string) {
    const props = await this.prisma.property.findMany({ where: { ownerId: id }, orderBy: { createdAt: 'desc' } });
    return Promise.all(props.map(async (p: { id: string; title: string; city: string; state: string; rent: number; bedrooms: number; bathrooms: number }) => {
      const latest = await this.prisma.application.findFirst({ where: { propertyId: p.id }, include: { bgCheck: true }, orderBy: { submittedAt: 'desc' } });
      return {
        id: p.id,
        title: p.title,
        city: p.city,
        state: p.state,
        rent: p.rent,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        thumbUrl: null,
        latestApplicationId: latest?.id || null,
        bgCheckStatus: latest?.bgCheck?.status || null
      };
    }));
  }
}
