"use client";

import { Link } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

interface ILinkListProps {
  links: Array<{ path: string; label: string }>;
}

export function LinkList({ links }: ILinkListProps) {
  const pathname = usePathname();

  return (
    <>
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
    </>
  );
}
