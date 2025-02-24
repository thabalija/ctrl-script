"use client";

import { Card, Icon } from "@chakra-ui/react";

export interface IIconCardProps {
  description: string;
  icon: React.ReactNode;
  title: string;
}

export function IconCard({ description, icon, title }: IIconCardProps) {
  return (
    <Card.Root width="100%">
      <Card.Body alignItems="center" padding="64px 32px">
        <Icon fontSize="48px" mb="32px">
          {icon}
        </Icon>
        <Card.Title mb="12px" textAlign="center">
          {title}
        </Card.Title>
        <Card.Description textAlign="center">{description}</Card.Description>
      </Card.Body>
    </Card.Root>
  );
}
