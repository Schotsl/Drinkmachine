import "@mantine/core/styles.css";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";

import { ReactNode } from "react";
import RootProviders from "./_components/RootProviders";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <RootProviders>
      <html lang="en" {...mantineHtmlProps}>
        <head>
          <ColorSchemeScript />
        </head>
        <body>
          <MantineProvider>{children}</MantineProvider>
        </body>
      </html>
    </RootProviders>
  );
}
