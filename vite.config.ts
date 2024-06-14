import * as path from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import devtools from "solid-devtools/vite";
import { polyfillNode } from "esbuild-plugin-polyfill-node";
// @ts-ignore
import * as packageJson from "./package.json";

const version = packageJson.version;

export default defineConfig({
  plugins: [
    devtools({
      autoname: true,
    }),
    solidPlugin({ extensions: ["ts"] }),
  ],
  resolve: {
    alias: {
      src: path.resolve("src/"),
    },
  },
  server: {
    port: 3000,
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
      plugins: [
        polyfillNode({
          globals: {
            buffer: true,
          },
        }),
      ],
    },
    exclude: ["csstype"],
  },
  define: {
    TON_UNITY_SDK_VERSION: JSON.stringify(version),
  },
  build: {
    target: "esnext",
    outDir: "lib",
    emptyOutDir: true,
    minify: false,
    sourcemap: true,
    lib: {
      formats: ["es", "cjs"],
      entry: path.resolve("src/index.ts"),
      name: "TON_UNITY_SDK",
      fileName: (format) => {
        switch (format) {
          case "es":
            return "index.mjs";
          case "cjs":
            return "index.cjs";
          default:
            throw new Error("Unknown format");
        }
      },
    },
    rollupOptions: {
      external: [
        "classnames",
        "deepmerge",
        "@tonconnect/ui",
        "ua-parser-js",
        "@ton/core",
      ],
      output: {
        globals: {
          "@tonconnect/ui": "TonConnectUI",
          deepmerge: "deepmerge",
          classnames: "classNames",
          "ua-parser-js": "UAParser",
          "@ton/core": "TonCore",
        },
      },
    },
  },
});
