import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CTRL Script",
    short_name: "CTRL Script",
    description: "Transform how you manage your files",
    start_url: "/",
    display: "standalone",
    background_color: "#c084fc",
    theme_color: "#000000",
    icons: [
      {
        src: "/images/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
