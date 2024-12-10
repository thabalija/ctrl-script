"use client";

import { Container, Link } from "@chakra-ui/react";
import { ThemeSwitcher } from "../../../components/ui/theme-switcher";

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

      <Container>
        <ThemeSwitcher />
      </Container>
    </Container>
  );
}
