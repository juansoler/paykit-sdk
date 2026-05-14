import { validateRequiredKeys } from '@paykit-sdk/core';
import { PaystackProvider, PaystackOptions } from './paystack-provider';

export const createPaystack = (config: PaystackOptions) => new PaystackProvider(config);

export const paystack = () => {
  const envVars = validateRequiredKeys(
    ['PAYSTACK_SECRET_KEY'],
    (process.env as Record<string, string>) ?? {},
    'Missing required environment variables: {keys}',
  );

  const isSandbox = process.env.NODE_ENV !== 'production';

  return createPaystack({
    secretKey: envVars.PAYSTACK_SECRET_KEY,
    isSandbox,
    debug: isSandbox,
  });
};

export { PaystackProvider };
export type { PaystackOptions };
