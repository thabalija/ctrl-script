"use client";

import { Container, Flex, Heading, HStack } from "@chakra-ui/react";
import { MdAutoGraph } from "react-icons/md";
import { SlChemistry } from "react-icons/sl";
import { TbDatabase } from "react-icons/tb";
import IconCard from "../../../core/IconCard/IconCard";

export default function KeyFeatures() {
  const cards = [
    {
      title: "File modification",
      description:
        "Review and modify text or metadata across multiple documents.",
      icon: <TbDatabase />,
    },
    {
      title: "Data extraction",
      description: "Extract specific data points from CSV, JSON, or XML files.",
      icon: <SlChemistry />,
    },
    {
      title: "Reports generation",
      description: "Generate custom reports from raw data files.",
      icon: <MdAutoGraph />,
    },
  ];
  return (
    <Container textAlign="center" maxWidth="1200px" padding="24px">
      <Heading as="h1" mb="48px" size="3xl">
        KeyFeatures
      </Heading>
      <HStack alignItems="stretch" justifyContent="space-between" gap="8">
        {cards.map((card) => (
          <Flex key={card.title} flex="1" alignItems="stretch">
            <IconCard
              title={card.title}
              description={card.description}
              icon={card.icon}
            />
          </Flex>
        ))}
      </HStack>
    </Container>
  );
}
