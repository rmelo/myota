"use client"

import customSystem from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import "../i18n/config";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ChakraProvider value={customSystem}>
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
