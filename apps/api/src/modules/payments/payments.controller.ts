
import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private svc: PaymentsService) {}

  @Post('checkout-session')
  create(@Body() body: { applicationId?: string; propertyId?: string; payerUserId: string; payeeUserId: string; amountCents: number; type: string }) {
    return this.svc.createCheckoutSession(body);
  }
}
