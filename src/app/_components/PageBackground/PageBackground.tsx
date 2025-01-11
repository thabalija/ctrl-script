"use client";

import { Box } from "@chakra-ui/react";
import { RoundedTriangle } from "../RoundedTriangle/RoundedTriangle";

export function PageBackground() {
  return (
    <>
      <Box
        position="absolute"
        top={["300px", "300px", "300px", "300px"]}
        left={["-150px", "-100px", "-60px", "-60px"]}
        color="purple.400"
        transform="rotate(-30deg) scale(25)"
        transition="all 0.3s"
        boxShadow="120px 5px 0px 0px #FFFFFF"
      >
        <RoundedTriangle />
      </Box>
      <Box
        position="absolute"
        top={["10px", "20px", "40px", "40px"]}
        right={["-140px", "-80px", "50px", "100px"]}
        color="purple.400"
        transform="rotate(35deg) scale(25) skewY(-5deg)"
        transition="all 0.3s"
      >
        <RoundedTriangle />
      </Box>
      <Box
        position="absolute"
        bottom={["-100px", "-100px", "-150px", "-110px"]}
        left={["-150px", "-100px", "200px", "200px"]}
        color="purple.400"
        transform="rotate(200deg) scale(30, 30)"
        transition="all 0.3s"
      >
        <RoundedTriangle />
      </Box>
      <Box
        position="absolute"
        bottom={["200px", "200px", "200px", "200px"]}
        right={["-100px", "-100px", "0px", "0px"]}
        transform="rotate(-30deg) scale(30, 20)"
        color="purple.400"
        transition="all 0.3s"
      >
        <RoundedTriangle />
      </Box>
    </>
  );
}
