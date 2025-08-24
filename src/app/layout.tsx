"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ChakraProvider value={defaultSystem}>
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
