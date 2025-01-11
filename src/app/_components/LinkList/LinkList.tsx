"use client";

import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

interface ILinkListProps {
  links: Array<{ path: string; label: string }>;
  onLinkClick?: () => unknown;
}

export function LinkList({ links, onLinkClick }: ILinkListProps) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          as={NextLink}
          fontWeight={pathname === link.path ? "bold" : "normal"}
          key={link.path}
          href={link.path}
          p="4px 12px"
          color={
            pathname === link.path
              ? "purple.500"
              : { _light: "gray.600", _dark: "gray.300" }
          }
          onClick={onLinkClick ? () => onLinkClick() : undefined}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
