import { PayKit, createEndpointHandlers } from '@paykit-sdk/core';
import { paystack } from '@paykit-sdk/paystack';

export const paykit = new PayKit(paystack());
export const endpoints = createEndpointHandlers(paykit);
