"use client";

import { Card, Icon } from "@chakra-ui/react";

export interface IIconCardProps {
  description: string;
  icon: React.ReactNode;
  title: string;
}

export default function IconCard({ description, icon, title }: IIconCardProps) {
  return (
    <Card.Root>
      <Card.Body alignItems="center" padding="64px 32px">
        <Icon fontSize="48px" mb="32px">
          {icon}
        </Icon>
        <Card.Title mb="12px">{title}</Card.Title>
        <Card.Description textAlign="center">{description}</Card.Description>
      </Card.Body>
    </Card.Root>
  );
}
