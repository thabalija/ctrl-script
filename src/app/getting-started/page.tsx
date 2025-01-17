"use client";

import { Box, Code, Container, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { ROUTE } from "../_constants/route";
import { CodeBlock } from "./_components/CodeBlock/CodeBlock";
import { CSV_TRIM_CODE_EXAMPLE } from "./_constants/csv-trim-code-example";
import { WORDS_COUNT_EXAMPLE } from "./_constants/words-count-example";
import { XML_PARSING_CODE_EXAMPLE } from "./_constants/xml-parsing-code-example";
import { XML_SOURCE_COUNT_EXAMPLE } from "./_constants/xml-source-count-example";
import { Alert } from "@/components/ui/alert";

export default function GettingStarted() {
  return (
    <Container maxWidth="3xl">
      <Heading as="h1" size="3xl" marginBottom="4">
        Getting Started
      </Heading>
      <Heading as="h2" size="xl" marginBottom="2">
        How to import files?
      </Heading>
      <Text as="p" marginBottom="8">
        You can import any type of text files, or a compressed archives
        containing text files into the app. Binary files are not supported. The
        app will parse the file and display the content in the editor. You can
        then apply a script to modify the file content, or extract data from the
        files.
      </Text>

      <Heading as="h2" size="xl" marginBottom="2">
        Where to find files?
      </Heading>
      <Text as="p" marginBottom="8">
        Once you have imported a file, you can write a script to modify the
        file, or upload existing scripts. The script is written in JavaScript. A{" "}
        <Code>new Function()</Code> will be created from the entered script
        text. In the{" "}
        <Link as={NextLink} href={ROUTE.EDITOR} colorPalette="purple">
          editor
        </Link>
        , script function will be called with selected file as the first
        argument, while in the{" "}
        <Link as={NextLink} href={ROUTE.REPORT_GENERATOR} colorPalette="purple">
          report generator
        </Link>
        , the script function will be called with array of selected files as the
        first argument.
      </Text>

      <Heading as="h2" size="2xl" marginBottom="4">
        Usage examples
      </Heading>
      <Alert
        colorPalette="purple"
        marginBottom="4"
        status="info"
        title={
          <>
            Value returned from the editor or report generator must always be a{" "}
            <Code fontWeight="bold">string</Code>.
          </>
        }
      />

      <Heading as="h3" size="lg" marginBottom="2">
        Counting words
      </Heading>

      <Text as="p" marginBottom="4">
        Count words within the <Code>.txt</Code> file
      </Text>
      <Box marginBottom="8">
        <CodeBlock code={WORDS_COUNT_EXAMPLE} />
      </Box>

      <Heading as="h3" size="lg" marginBottom="2">
        Trimming strings
      </Heading>

      <Text as="p" marginBottom="4">
        Remove excess spaces from the <Code>.csv</Code> cells.
      </Text>
      <Box marginBottom="8">
        <CodeBlock code={CSV_TRIM_CODE_EXAMPLE} />
      </Box>

      <Text as="p" marginBottom="4">
        Remove excess spaces from the source translation inside the{" "}
        <Code>.xml</Code> file.
      </Text>
      <Box marginBottom="8">
        <CodeBlock code={XML_PARSING_CODE_EXAMPLE} />
      </Box>

      <Heading as="h3" size="lg" marginBottom="2">
        Count source elements
      </Heading>
      <Text as="p" marginBottom="4">
        Count all the filled source elements within multiple <Code>.xml</Code>{" "}
        translation files. Use it inside the{" "}
        <Link as={NextLink} href={ROUTE.REPORT_GENERATOR} colorPalette="purple">
          report generator
        </Link>
        .
      </Text>
      <Box marginBottom="24">
        <CodeBlock code={XML_SOURCE_COUNT_EXAMPLE} />
      </Box>
    </Container>
  );
}
