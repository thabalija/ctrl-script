// app/components/ThemeSwitcher.tsx
"use client";

import { Container, Icon } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { Switch } from "./switch";
import { flushSync } from "react-dom";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    document.startViewTransition(() => {
      flushSync(() => {
        setTheme(theme === "light" ? "dark" : "light");
      });
    });
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
        aria-label="Toggle theme"
        trackLabel={{
          on: (
            <Icon color="yellow.400" aria-label="Set Light Mode">
              <FiSun />
            </Icon>
          ),
          off: (
            <Icon color="gray.400" aria-label="Set Dark Mode">
              <FiMoon />
            </Icon>
          ),
        }}
      />
    </Container>
  );
}
