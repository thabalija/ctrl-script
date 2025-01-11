import { Provider } from "@/components/ui/provider";
import { Container } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer } from "./_components/Footer/Footer";
import { PageBackground } from "./_components/PageBackground/PageBackground";
import { PageHeader } from "./_components/PageHeader/PageHeader";

export const metadata: Metadata = {
  title: "CTRL script",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <link rel="favicon" href="/images/favicon.ico" />
        <link rel="manifest" href="/manifest/site.webmanifest" />
      </head>
      <body>
        <Provider>
          <Container
            minHeight="100vh"
            display="flex"
            flexDirection="column"
            padding="0"
            margin="0"
            maxWidth="100vw"
            overflow="hidden"
          >
            <PageBackground />
            <PageHeader />

            <Container flex="1" padding="0" marginTop="24px">
              <Suspense>{children}</Suspense>
            </Container>
            <Footer />
          </Container>
        </Provider>
      </body>
    </html>
  );
}
