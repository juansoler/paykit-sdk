import { z } from 'zod';
import { PayKitProvider, ProviderMetadataRegistry } from './paykit-provider';
import { CreateRefundSchema } from './resources';
import { CreateCheckoutSchema, UpdateCheckoutSchema } from './resources/checkout';
import { CreateCustomerParams, UpdateCustomerParams } from './resources/customer';
import {
  CapturePaymentSchema,
  CreatePaymentSchema,
  UpdatePaymentSchema,
} from './resources/payment';
import {
  CreateSubscriptionSchema,
  UpdateSubscriptionSchema,
} from './resources/subscription';
import { Webhook, WebhookSetupConfig } from './webhook-provider';

export const PAYKIT_METADATA_KEY = '__paykit';

/**
 * @template TMetadata - The registry of provider-specific metadata types
 * @template TNative - The type of the underlying native SDK client
 */
class PayKit<
  TMetadata extends ProviderMetadataRegistry = ProviderMetadataRegistry,
  TNative = any,
  TRawEvents extends Record<string, any> = Record<string, any>,
> {
  constructor(private provider: PayKitProvider<TMetadata, TNative, TRawEvents>) {}

  /**
   * Access the underlying native SDK (e.g., Stripe, Adyen) directly
   * with full type safety.
   */
  get _native(): TNative {
    return this.provider._native;
  }

  /**
   * Access the provider's name (e.g., 'stripe')
   */
  get providerName(): string {
    return this.provider.providerName;
  }

  checkouts = {
    create: (params: CreateCheckoutSchema<TMetadata['checkout']>) =>
      this.provider.createCheckout(params),

    retrieve: (id: string) => this.provider.retrieveCheckout(id),

    update: (id: string, params: UpdateCheckoutSchema<TMetadata['checkout']>) =>
      this.provider.updateCheckout(id, params),

    delete: (id: string) => this.provider.deleteCheckout(id),
  };

  customers = {
    create: (params: CreateCustomerParams<TMetadata['customer']>) =>
      this.provider.createCustomer(params),

    update: (id: string, params: UpdateCustomerParams<TMetadata['customer']>) =>
      this.provider.updateCustomer(id, params),

    retrieve: (id: string) => this.provider.retrieveCustomer(id),

    delete: (id: string) => this.provider.deleteCustomer(id),
  };

  subscriptions = {
    create: (params: CreateSubscriptionSchema<TMetadata['subscription']>) =>
      this.provider.createSubscription(params),

    update: (id: string, params: UpdateSubscriptionSchema<TMetadata['subscription']>) =>
      this.provider.updateSubscription(id, params),

    cancel: (id: string) => this.provider.cancelSubscription(id),

    retrieve: (id: string) => this.provider.retrieveSubscription(id),

    delete: (id: string) => this.provider.deleteSubscription(id),
  };

  payments = {
    create: (params: CreatePaymentSchema<TMetadata['payment']>) =>
      this.provider.createPayment(params),

    retrieve: (id: string) => this.provider.retrievePayment(id),

    update: (id: string, params: UpdatePaymentSchema<TMetadata['payment']>) =>
      this.provider.updatePayment(id, params),

    capture: (id: string, params: CapturePaymentSchema) =>
      this.provider.capturePayment(id, params),

    delete: (id: string) => this.provider.deletePayment(id),

    cancel: (id: string) => this.provider.cancelPayment(id),
  };

  refunds = {
    create: (params: CreateRefundSchema<TMetadata['refund']>) =>
      this.provider.createRefund(params),
  };

  webhooks = {
    setup: (config: Omit<WebhookSetupConfig<TRawEvents>, 'provider'>) =>
      new Webhook<TRawEvents>().setup({ ...config, provider: this.provider }),
  };
}
export { PayKit, PayKitProvider };

export * from './resources';
export * from './types';
export * from './tools';
export * from './webhook-provider';
export * from './http-client';
export * from './error';
export * from './paykit-provider';
export * from './provider-shema';
export * from './server/create-endpoint-handler';
export * from './server/endpoints';
export * from './oauth2-token-manager';
export { z as Schema };
