import { Provider } from "@/components/ui/provider";
import type { Metadata } from "next";
import { Footer } from "../features/footer/Footer/Footer";
import { Header } from "../features/header/Header/Header";
import { Container } from "@chakra-ui/react";

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
      <body>
        <Provider>
          <Container minHeight="100vh" display="flex" flexDirection="column">
            <Header />
            <Container flex="1" padding="0" marginTop="24px">
              {children}
            </Container>
            <Footer />
          </Container>
        </Provider>
      </body>
    </html>
  );
}
