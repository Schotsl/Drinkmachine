"use client";

import "@mantine/core/styles.css";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({ children }: { children: ReactNode }) {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <html lang="en" {...mantineHtmlProps}>
        <head>
          <ColorSchemeScript />
        </head>
        <body>
          <MantineProvider>{children}</MantineProvider>
        </body>
      </html>
    </QueryClientProvider>
  );
}
