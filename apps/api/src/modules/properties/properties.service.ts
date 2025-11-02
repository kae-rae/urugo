
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  list(q: any) {
    const { city, state, qtext } = q || {};
    return this.prisma.property.findMany({
      where: {
        city: city || undefined,
        state: state || undefined,
        OR: qtext ? [
          { title: { contains: qtext, mode: 'insensitive' } }
        ] : undefined
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
