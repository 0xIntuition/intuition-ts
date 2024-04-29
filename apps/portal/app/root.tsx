import { LoaderFunctionArgs, json, type MetaFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import { QueryClient } from '@tanstack/react-query';

import { getEnv } from './.server/env';
import { ClientOnly } from 'remix-utils/client-only';
import Providers from './.client/providers';
import './styles/globals.css';
import { ClientHintCheck, getHints } from './lib/utils/client-hints';
import { getTheme } from './.server/theme';
import { useNonce } from './lib/utils/nonce-provider';
import { useTheme } from './routes/actions+/set-theme';
import { html } from 'remix-utils/responses';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data ? 'Intuition Portal' : 'Error | Intuition Portal' },
    { name: 'description', content: `Intuition Portal` },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    env: getEnv(),
    requestInfo: {
      hints: getHints(request),
      path: new URL(request.url).pathname,
      userPrefs: {
        theme: getTheme(request),
      },
    },
  });
}

export function Document({
  children,
  nonce,
  theme = 'system',
}: {
  children: React.ReactNode;
  nonce: string;
  theme?: string;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <ClientHintCheck nonce={nonce} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const queryClient = new QueryClient(); // Set up a tanstack QueryClient. Required for wagmi v2

export default function App() {
  const nonce = useNonce();
  const theme = useTheme();

  return (
    <Document nonce={nonce} theme={theme}>
      <ClientOnly>
        {() => (
          <Providers>
            <Outlet />
          </Providers>
        )}
      </ClientOnly>
    </Document>
  );
}
