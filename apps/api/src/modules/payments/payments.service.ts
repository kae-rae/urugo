
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' });

  async createCheckoutSession(data: { applicationId?: string; propertyId?: string; payerUserId: string; payeeUserId: string; amountCents: number; type: string }) {
    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: `${process.env.APP_URL}/pay/success`,
      cancel_url: `${process.env.APP_URL}/pay/cancel`,
      line_items: [{ price_data: { currency: 'usd', unit_amount: data.amountCents, product_data: { name: `Payment: ${data.type}` } }, quantity: 1 }],
    });
    return { checkoutUrl: session.url };
  }
}
