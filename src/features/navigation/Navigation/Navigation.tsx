"use client";

import Link from "next/link";

export function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/editor">Editor</Link>
      <Link href="/files">Files</Link>
    </nav>
  );
}
