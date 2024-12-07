"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Welcome to CTRL Script!</h1>
      <Link href="/editor">Open editor</Link>
    </>
  );
}
