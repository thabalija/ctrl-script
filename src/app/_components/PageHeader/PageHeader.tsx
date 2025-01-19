"use client";

import { Button } from "@/components/ui/button";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Container, DrawerTitle, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { ThemeSwitcher } from "../../../components/ui/theme-switcher";
import { ROUTE } from "../../../app/_constants/route";
import { LinkList } from "../LinkList/LinkList";
import { Logo } from "../Logo/Logo";

export function PageHeader() {
  const [open, setOpen] = useState(false);

  const links = [
    { path: ROUTE.FILES, label: "Files" },
    { path: ROUTE.SCRIPTS, label: "Scripts" },
    { path: ROUTE.EDITOR, label: "Editor" },
    { path: ROUTE.REPORT_GENERATOR, label: "Report Generator" },
    { path: ROUTE.GETTING_STARTED, label: "Getting started" },
  ];

  return (
    <DrawerRoot
      placement="start"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <DrawerBackdrop />

      <Container
        display={"flex"}
        justifyContent={"space-between"}
        alignItems="center"
        padding="12px 24px"
        paddingLeft={{ lgDown: "0" }}
      >
        <DrawerTrigger asChild hideFrom={["lg", "xl"]}>
          <Button variant="ghost" aria-label="Toggle menu">
            <IoMenu />
          </Button>
        </DrawerTrigger>

        <Container
          padding="0"
          flex="1 0 150px"
          textAlign={["center", "center"]}
        >
          <Logo />
        </Container>

        <Container padding="0" hideBelow={"lg"}>
          <LinkList links={links} onLinkClick={() => setOpen(false)} />
        </Container>

        <Container padding="0" flex="0">
          <ThemeSwitcher />
        </Container>
      </Container>

      <DrawerContent>
        <DrawerTitle padding="24px">
          <Logo />
        </DrawerTitle>
        <DrawerBody>
          <VStack align={"start"}>
            <LinkList links={links} onLinkClick={() => setOpen(false)} />
          </VStack>
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
}
