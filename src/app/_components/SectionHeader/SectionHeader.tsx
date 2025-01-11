"use client";

import { Box, Heading, Text } from "@chakra-ui/react";

interface ISectionHeaderProps {
  title?: string | JSX.Element;
  description?: string | JSX.Element;
}

export function SectionHeader({ title, description }: ISectionHeaderProps) {
  return (
    <Box maxWidth="620px">
      <Heading as="h1" size="3xl" marginBottom="6">
        {title}
      </Heading>
      <Text marginBottom="6">{description}</Text>
    </Box>
  );
}
