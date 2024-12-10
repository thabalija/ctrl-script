// app/components/ThemeSwitcher.tsx
"use client";

import { Container, Text } from "@chakra-ui/react";
import { Switch } from "./switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Container display="flex" p="0" justifyContent="flex-end">
      <Text mr="12px">Dark mode</Text>
      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
    </Container>
  );
}
