"use client";

import { Link } from "@chakra-ui/react";

export function Logo() {
  return (
    <Link
      fontFamily="monospace"
      fontSize="20px"
      fontWeight="bold"
      href="/"
      letterSpacing="-1px"
      p="4px 12px"
    >
      CTRL Script
    </Link>
  );
}
