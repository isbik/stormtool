import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Storm Tools",
    short_name: "Storm Tools",
    description: "Коллекция инструментов для разработки",
    start_url: "/",
    display: "standalone",
    background_color: "#1A202C",
    theme_color: "#1A202C",
    icons: [
      {
        src: "/assets/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
