"use client";

import { Flex, Spinner } from "@chakra-ui/react";

export function Loader() {
  return (
    <Flex alignItems="center" justifyContent="center" height="100px">
      <Spinner size="lg" color="colorPalette.600" colorPalette="purple" />
    </Flex>
  );
}
