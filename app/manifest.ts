import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MyWebSite",
    short_name: "MySite",
    icons: [
      {
        src: "/quizSphare.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/quizSphare.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: "#ffffff",

    background_color: "#ffffff",
    display: "standalone",
  };
}
