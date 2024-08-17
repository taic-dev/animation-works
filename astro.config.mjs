import { defineConfig } from "astro/config";
import glsl from "vite-plugin-glsl";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [
      glsl({
        watch: false,
      }),
    ],
    ssr: {
      noExternal: [
          'gsap',
          'gsap/CustomEase',
          'gsap/ScrollTrigger'
      ]
  }
  },
});
