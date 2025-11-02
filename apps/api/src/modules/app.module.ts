
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PropertiesModule } from './properties/properties.module';
import { ApplicationsController } from './applications/applications.controller';
import { OwnersController } from './owners/owners.controller';
import { PaymentsController } from './payments/payments.controller';
import { PaymentsService } from './payments/payments.service';
import { PrismaModule } from './prisma/prisma.module';
import { MetricsModule } from './metrics/metrics.module';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PropertiesModule, PrismaModule, MetricsModule],
  controllers: [AppController, ApplicationsController, OwnersController, PaymentsController],
  providers: [PaymentsService]
})
export class AppModule {}
