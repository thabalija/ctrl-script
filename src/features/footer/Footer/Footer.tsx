"use client";

import { Container, Icon, Link } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

export function Footer() {
  return (
    <Container padding="12px">
      <Link href="https://github.com/thabalija/ctrl-script" target="_blank">
        <Icon fontSize="2xl" marginRight="4px">
          <FaGithub />
        </Icon>
        GitHub
      </Link>
    </Container>
  );
}
