"use client";

import { Box } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RoundedTriangle } from "../RoundedTriangle/RoundedTriangle";

export function PageBackground() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark");
  }, [theme]);

  const [transformTopLeft, setTransformTopLeft] = useState(
    "rotate(-30deg) scale(25)",
  );
  const [transformTopRight, setTransformTopRight] = useState(
    "rotate(35deg) scale(25) skewY(-5deg)",
  );
  const [transformBottomRight, setTransformBottomRight] = useState(
    "rotate(-23deg) scale(30, 20)",
  );
  const [transformBottomLeft, setTransformBottomLeft] = useState(
    "rotate(190deg) scale(30, 30)",
  );

  useEffect(() => {
    if (pathname === "/") {
      setTransformTopLeft("rotate(-30deg) scale(25)");
      setTransformTopRight("rotate(35deg) scale(25) skewY(-5deg)");
      setTransformBottomRight("rotate(-23deg) scale(30, 20)");
      setTransformBottomLeft("rotate(190deg) scale(30, 30)");
    } else {
      setTransformTopLeft("rotate(-30deg) scale(10) translate(2px, 2px)");
      setTransformTopRight(
        "rotate(35deg) scale(13) skewY(-5deg) translate(2px, -4px)",
      );
      setTransformBottomRight("rotate(-23deg) scale(15, 10)");
      setTransformBottomLeft(
        "rotate(190deg) scale(15, 15) translate(18px, 1px)",
      );
    }
  }, [pathname]);

  return (
    <>
      <Box
        position="absolute"
        top="300px"
        left="-60px"
        color={isDarkTheme ? "purple.400" : "green.400"}
        transform={transformTopLeft}
        transition="all 0.5s"
      >
        <RoundedTriangle />
      </Box>
      <Box
        position="absolute"
        top="40px"
        right="100px"
        color={isDarkTheme ? "purple.400" : "green.400"}
        transform={transformTopRight}
        transition="all 0.5s"
      >
        <RoundedTriangle />
      </Box>
      <Box
        position="absolute"
        bottom="-110px"
        left="25%"
        color={isDarkTheme ? "purple.400" : "green.400"}
        transform={transformBottomLeft}
        transition="all 0.5s"
      >
        <RoundedTriangle />
      </Box>
      <Box
        position="absolute"
        bottom="25%"
        right="0"
        color={isDarkTheme ? "purple.400" : "green.400"}
        transform={transformBottomRight}
        transition="all 0.5s"
      >
        <RoundedTriangle />
      </Box>
    </>
  );
}
