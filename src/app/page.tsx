"use client";

import { Box, Container } from "@chakra-ui/react";
import HomeHero from "./_components/HomeHero/HomeHero";
import KeyFeatures from "./_components/KeyFeatures/KeyFeatures";

export default function Home() {
  return (
    <Container padding="72px 0">
      <Box marginBottom="48px">
        <HomeHero />
      </Box>
      <KeyFeatures />
    </Container>
  );
}
