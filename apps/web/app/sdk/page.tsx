import React from 'react';
import { CopyButton } from '@/components/copy-button';
import { FinalCTA } from '@/components/final-cta';
import { Paykit as PaykitIcon } from '@/components/icons';
import { ProviderDemo } from '@/components/provider-demo';
import { ReactHooksDemo } from '@/components/react-hooks-demo';
import { SiteHeader } from '@/components/site-header';
import { Badge } from '@paykit-sdk/ui';
import { Code2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'PayKit SDK — Build payments without vendor lock-in',
  description:
    'A consistent TypeScript API across Stripe, PayPal, Polar, and more. Swap providers with 2 lines of code.',
};

const SdkPage = () => {
  return (
    <div className="font-inter bg-background font-pt-sans min-h-screen">
      <header className="bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center space-x-3">
            <PaykitIcon className="text-foreground size-4" />
            <span className="text-xl font-bold tracking-tight">PayKit</span>
          </Link>

          <SiteHeader showDocs />
        </nav>
      </header>

      <main>
        {/* SDK Hero */}
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 text-center">
          <div className="mb-6 space-y-4">
            <div className="bg-muted/50 inline-flex items-center space-x-2 rounded-full border px-4 py-2 text-sm">
              <Code2 className="h-4 w-4 text-blue-500" />
              <span className="text-muted-foreground">PayKit SDK</span>
              <Badge variant="secondary" className="ml-2">
                Open Source
              </Badge>
            </div>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Build payments
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                without vendor lock-in
              </span>
            </h1>

            <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
              A consistent TypeScript API across Stripe, PayPal, Polar, and more.
              Swap providers with 2 lines of code.
            </p>
          </div>

          <div className="flex items-center justify-center pt-4">
            <CopyButton
              className="min-h-fit max-w-full overflow-hidden px-4 py-3 text-left break-words whitespace-pre-wrap"
              value="npx shadcn@latest add https://www.usepaykit.dev/r/stripe-nextjs-hooks"
              variant="outline"
              size="lg"
            >
              npx shadcn@latest add https://usepaykit.dev/r/stripe-nextjs-hooks
            </CopyButton>
          </div>
        </div>

        <ProviderDemo />

        <ReactHooksDemo />

        <FinalCTA />
      </main>
    </div>
  );
};

export default SdkPage;
