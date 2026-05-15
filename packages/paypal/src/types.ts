import type { Order } from '@paypal/paypal-server-sdk';

export type SubscriptionStatus =
  | 'APPROVAL_PENDING'
  | 'APPROVED'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'CANCELLED'
  | 'EXPIRED';

export interface PayPalSubscription {
  /**
   * The ID of the subscription.
   */
  id: string;

  /**
   * The ID of the plan.
   */
  plan_id: string;

  /**
   * The status of the subscription.
   */
  status: SubscriptionStatus;

  /**
   * The time the status was updated.
   */
  status_update_time?: string;

  /**
   * The time the subscription started.
   */
  start_time?: string;

  /**
   * The time the subscription was created.
   */
  create_time?: string;

  /**
   * The subscriber of the subscription.
   */
  subscriber?: {
    /**
     * The email of the subscriber.
     */
    email_address?: string;

    /**
     * The name of the subscriber.
     */
    name?: {
      /**
       * The given name of the subscriber.
       */
      given_name?: string;
      /**
       * The surname of the subscriber.
       */
      surname?: string;
    };
  };

  /**
   * The billing info of the subscription.
   */
  billing_info?: {
    /**
     * The outstanding balance of the subscription.
     */
    outstanding_balance?: {
      /**
       * The currency code of the outstanding balance.
       */
      currency_code?: string;
      /**
       * The value of the outstanding balance.
       */
      value?: string;
    };
    cycle_executions?: Array<{
      /**
       * The tenure type of the cycle execution.
       */
      tenure_type?: string;

      /**
       * The sequence of the cycle execution.
       */
      sequence?: number;

      /**
       * The number of cycles completed.
       */
      cycles_completed?: number;

      /**
       * The total number of cycles.
       */
      total_cycles?: number;
    }>;
  };

  /**
   * The links of the subscription.
   */
  links?: Array<{
    /**
     * The href of the link.
     */
    href?: string;
    /**
     * The rel of the link.
     */
    rel?: string;
    /**
     * The method of the link.
     */
    method?: string;
  }>;

  /**
   * The custom ID of the subscription, i.e metadata
   */
  customId?: string;
}

export type PayPalRawEvents = {
  [K in keyof PayPalRawEventsSource as `paypal.${K}`]: PayPalRawEventsSource[K];
};

export interface PayPalWebhookBase {
  id: string;
  event_version: string;
  create_time: string;
  resource_type: string;
  event_type: string;
  summary: string;
  resource_version?: string;
  resource: Record<string, unknown>;
  links: Array<{ href: string; rel: string; method: string }>;
}

type PayPalOrder = Order;
type PayPalCapture = Record<string, unknown>;
type PayPalRefund = Record<string, unknown>;
type PayPalDispute = Record<string, unknown>;

type PayPalWebhookEvent<
  T extends string,
  R = Record<string, unknown>,
> = PayPalWebhookBase & { event_type: T; resource: R };

type PayPalRawEventsSource = {
  // Payments v2
  'PAYMENT.AUTHORIZATION.CREATED': PayPalWebhookEvent<'PAYMENT.AUTHORIZATION.CREATED'>;
  'PAYMENT.AUTHORIZATION.VOIDED': PayPalWebhookEvent<'PAYMENT.AUTHORIZATION.VOIDED'>;
  'PAYMENT.CAPTURE.COMPLETED': PayPalWebhookEvent<
    'PAYMENT.CAPTURE.COMPLETED',
    PayPalCapture
  >;
  'PAYMENT.CAPTURE.DECLINED': PayPalWebhookEvent<
    'PAYMENT.CAPTURE.DECLINED',
    PayPalCapture
  >;
  'PAYMENT.CAPTURE.PENDING': PayPalWebhookEvent<
    'PAYMENT.CAPTURE.PENDING',
    PayPalCapture
  >;
  'PAYMENT.CAPTURE.REFUNDED': PayPalWebhookEvent<
    'PAYMENT.CAPTURE.REFUNDED',
    PayPalCapture
  >;
  'PAYMENT.CAPTURE.REVERSED': PayPalWebhookEvent<
    'PAYMENT.CAPTURE.REVERSED',
    PayPalCapture
  >;
  'PAYMENT.REFUND.PENDING': PayPalWebhookEvent<
    'PAYMENT.REFUND.PENDING',
    PayPalRefund
  >;
  'PAYMENT.REFUND.FAILED': PayPalWebhookEvent<
    'PAYMENT.REFUND.FAILED',
    PayPalRefund
  >;

  // Orders
  'CHECKOUT.ORDER.APPROVED': PayPalWebhookEvent<
    'CHECKOUT.ORDER.APPROVED',
    PayPalOrder
  >;
  'CHECKOUT.ORDER.COMPLETED': PayPalWebhookEvent<
    'CHECKOUT.ORDER.COMPLETED',
    PayPalOrder
  >;
  'CHECKOUT.PAYMENT-APPROVAL.REVERSED': PayPalWebhookEvent<
    'CHECKOUT.PAYMENT-APPROVAL.REVERSED',
    PayPalOrder
  >;

  // Subscriptions
  'BILLING.SUBSCRIPTION.CREATED': PayPalWebhookEvent<
    'BILLING.SUBSCRIPTION.CREATED',
    PayPalSubscription
  >;
  'BILLING.SUBSCRIPTION.ACTIVATED': PayPalWebhookEvent<
    'BILLING.SUBSCRIPTION.ACTIVATED',
    PayPalSubscription
  >;
  'BILLING.SUBSCRIPTION.UPDATED': PayPalWebhookEvent<
    'BILLING.SUBSCRIPTION.UPDATED',
    PayPalSubscription
  >;
  'BILLING.SUBSCRIPTION.EXPIRED': PayPalWebhookEvent<
    'BILLING.SUBSCRIPTION.EXPIRED',
    PayPalSubscription
  >;
  'BILLING.SUBSCRIPTION.CANCELLED': PayPalWebhookEvent<
    'BILLING.SUBSCRIPTION.CANCELLED',
    PayPalSubscription
  >;
  'BILLING.SUBSCRIPTION.SUSPENDED': PayPalWebhookEvent<
    'BILLING.SUBSCRIPTION.SUSPENDED',
    PayPalSubscription
  >;
  'BILLING.SUBSCRIPTION.PAYMENT.FAILED': PayPalWebhookEvent<
    'BILLING.SUBSCRIPTION.PAYMENT.FAILED',
    PayPalSubscription
  >;

  // Plans
  'BILLING.PLAN.CREATED': PayPalWebhookEvent<'BILLING.PLAN.CREATED'>;
  'BILLING.PLAN.UPDATED': PayPalWebhookEvent<'BILLING.PLAN.UPDATED'>;
  'BILLING.PLAN.ACTIVATED': PayPalWebhookEvent<'BILLING.PLAN.ACTIVATED'>;
  'BILLING.PLAN.DEACTIVATED': PayPalWebhookEvent<'BILLING.PLAN.DEACTIVATED'>;
  'BILLING.PLAN.PRICING-CHANGE.ACTIVATED': PayPalWebhookEvent<'BILLING.PLAN.PRICING-CHANGE.ACTIVATED'>;

  // Disputes
  'CUSTOMER.DISPUTE.CREATED': PayPalWebhookEvent<
    'CUSTOMER.DISPUTE.CREATED',
    PayPalDispute
  >;
  'CUSTOMER.DISPUTE.RESOLVED': PayPalWebhookEvent<
    'CUSTOMER.DISPUTE.RESOLVED',
    PayPalDispute
  >;
  'CUSTOMER.DISPUTE.UPDATED': PayPalWebhookEvent<
    'CUSTOMER.DISPUTE.UPDATED',
    PayPalDispute
  >;

  // Invoicing
  'INVOICING.INVOICE.CREATED': PayPalWebhookEvent<'INVOICING.INVOICE.CREATED'>;
  'INVOICING.INVOICE.PAID': PayPalWebhookEvent<'INVOICING.INVOICE.PAID'>;
  'INVOICING.INVOICE.CANCELLED': PayPalWebhookEvent<'INVOICING.INVOICE.CANCELLED'>;
  'INVOICING.INVOICE.REFUNDED': PayPalWebhookEvent<'INVOICING.INVOICE.REFUNDED'>;
  'INVOICING.INVOICE.UPDATED': PayPalWebhookEvent<'INVOICING.INVOICE.UPDATED'>;
  'INVOICING.INVOICE.SCHEDULED': PayPalWebhookEvent<'INVOICING.INVOICE.SCHEDULED'>;

  // Vault / Payment Method Tokens
  'VAULT.PAYMENT-TOKEN.CREATED': PayPalWebhookEvent<'VAULT.PAYMENT-TOKEN.CREATED'>;
  'VAULT.PAYMENT-TOKEN.DELETED': PayPalWebhookEvent<'VAULT.PAYMENT-TOKEN.DELETED'>;
  'VAULT.PAYMENT-TOKEN.DELETION-INITIATED': PayPalWebhookEvent<'VAULT.PAYMENT-TOKEN.DELETION-INITIATED'>;

  // Merchant onboarding
  'MERCHANT.ONBOARDING.COMPLETED': PayPalWebhookEvent<'MERCHANT.ONBOARDING.COMPLETED'>;
  'MERCHANT.PARTNER-CONSENT.REVOKED': PayPalWebhookEvent<'MERCHANT.PARTNER-CONSENT.REVOKED'>;

  // Catalog
  'CATALOG.PRODUCT.CREATED': PayPalWebhookEvent<'CATALOG.PRODUCT.CREATED'>;
  'CATALOG.PRODUCT.UPDATED': PayPalWebhookEvent<'CATALOG.PRODUCT.UPDATED'>;

  // Sales (legacy v1)
  'PAYMENT.SALE.COMPLETED': PayPalWebhookEvent<'PAYMENT.SALE.COMPLETED'>;
  'PAYMENT.SALE.DENIED': PayPalWebhookEvent<'PAYMENT.SALE.DENIED'>;
  'PAYMENT.SALE.PENDING': PayPalWebhookEvent<'PAYMENT.SALE.PENDING'>;
  'PAYMENT.SALE.REFUNDED': PayPalWebhookEvent<'PAYMENT.SALE.REFUNDED'>;
  'PAYMENT.SALE.REVERSED': PayPalWebhookEvent<'PAYMENT.SALE.REVERSED'>;
};

export type PayPalWebhookPayload =
  PayPalRawEvents[keyof PayPalRawEvents];
