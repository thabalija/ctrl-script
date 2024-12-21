// app/components/ThemeSwitcher.tsx
"use client";

import { Container, Icon } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { Switch } from "./switch";

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
      <Switch
        size="lg"
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        trackLabel={{
          on: (
            <Icon color="yellow.400">
              <FiSun />
            </Icon>
          ),
          off: (
            <Icon color="gray.400">
              <FiMoon />
            </Icon>
          ),
        }}
      />
    </Container>
  );
}
