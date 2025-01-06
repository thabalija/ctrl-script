"use client";

import { Container, Link } from "@chakra-ui/react";
import { ThemeSwitcher } from "../../../components/ui/theme-switcher";
import { LinkList } from "../LinkList/LinkList";

export function Header() {
  const links = [
    { path: "/files/", label: "Files" },
    { path: "/scripts/", label: "Scripts" },
    { path: "/editor/", label: "Editor" },
    { path: "/report-generator/", label: "Report Generator" },
  ];

  return (
    <Container
      display={"flex"}
      justifyContent={"space-between"}
      alignItems="center"
      padding="12px 24px"
    >
      <Container padding="0" flex="1 0 150px">
        <Link
          href="/"
          p="4px 12px"
          fontWeight="bold"
          fontSize="20px"
          letterSpacing="-1px"
          fontFamily="monospace"
        >
          CTRL Script
        </Link>
      </Container>

      <Container padding="0">
        <LinkList links={links} />
      </Container>

      <Container padding="0" flex="1 0 200px">
        <ThemeSwitcher />
      </Container>
    </Container>
  );
}
