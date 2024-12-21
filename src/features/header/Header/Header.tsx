"use client";

import { Container, Link } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "../../../components/ui/theme-switcher";

export function Header() {
  const pathname = usePathname();

  const links = [
    { path: "/files/", label: "Files" },
    { path: "/scripts/", label: "Scripts" },
    { path: "/editor/", label: "Editor" },
    { path: "/bulk-editor/", label: "Bulk Editor" },
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
        {links.map((link) => (
          <Link
            fontWeight={pathname === link.path ? "bold" : "normal"}
            key={link.path}
            href={link.path}
            p="4px 12px"
            color={
              pathname === link.path
                ? "purple.500"
                : { _light: "gray.600", _dark: "gray.300" }
            }
          >
            {link.label}
          </Link>
        ))}
      </Container>

      <Container padding="0" flex="1 0 200px">
        <ThemeSwitcher />
      </Container>
    </Container>
  );
}
