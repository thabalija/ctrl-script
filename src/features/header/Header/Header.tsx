"use client";

import { Container, Link } from "@chakra-ui/react";
import { ThemeSwitcher } from "../../../components/ui/theme-switcher";

export function Header() {
  return (
    <Container
      display={"flex"}
      justifyContent={"space-between"}
      padding="12px 0"
    >
      <Container padding="0" flex="1 0 120px">
        <Link href="/" p="4px 12px">
          CTRL Script
        </Link>
      </Container>

      <Container padding="0">
        <Link href="/files" p="4px 12px">
          Files
        </Link>
        <Link href="/scripts" p="4px 12px">
          Scripts
        </Link>
        <Link href="/editor" p="4px 12px">
          Editor
        </Link>
        <Link href="/bulk-editor" p="4px 12px">
          Bulk Editor
        </Link>
      </Container>

      <Container padding="0" flex="1 0 200px">
        <ThemeSwitcher />
      </Container>
    </Container>
  );
}
