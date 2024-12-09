"use client";

import { Container } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";

export function Header() {
  return (
    <Container display={"flex"} justifyContent={"space-between"}>
      <Link href="/">CTRL Script</Link>

      <Container>
        <Link href="/editor" p="12px 24px">
          Editor
        </Link>
        <Link href="/files" p="12px 24px">
          Files
        </Link>
      </Container>
    </Container>
  );
}
