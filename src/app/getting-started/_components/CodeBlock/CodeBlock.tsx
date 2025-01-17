"use client";

import { Box, Container, IconButton } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { themes } from "prism-react-renderer";
import { CodeBlock as ReactCodeBlock } from "react-code-block";
import { FaRegCopy } from "react-icons/fa";
import { Toaster, toaster } from "../../../../components/ui/toaster";
import { useEffect, useState } from "react";
import { Loader } from "../../../_components/Loader/Loader";

interface ICodeBlockDemoProps {
  code: string;
}

export function CodeBlock({ code }: ICodeBlockDemoProps) {
  const { theme } = useTheme();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  function copyCode(): void {
    navigator.clipboard.writeText(code);

    toaster.create({
      title: `Code copied!`,
      type: "success",
    });
  }

  return (
    <>
      {domLoaded ? (
        <Container
          background="bg.muted"
          borderRadius="sm"
          display="flex"
          fontSize="sm"
          overflow="scroll"
          padding="4"
          position="relative"
        >
          <Box flex="1">
            <ReactCodeBlock
              code={code}
              language="javascript"
              theme={theme === "dark" ? themes.vsDark : themes.vsLight}
            >
              <ReactCodeBlock.Code className="bg-gray-900 p-6 rounded-xl shadow-lg">
                <ReactCodeBlock.LineContent>
                  <ReactCodeBlock.Token />
                </ReactCodeBlock.LineContent>
              </ReactCodeBlock.Code>
            </ReactCodeBlock>
          </Box>

          <IconButton
            margin="-8px -8px 0 0"
            colorPalette="purple"
            rounded="full"
            variant="ghost"
            onClick={copyCode}
          >
            <FaRegCopy />
          </IconButton>

          <Toaster />
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
}
