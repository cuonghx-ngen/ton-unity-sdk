import * as path from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
// @ts-ignore
import * as packageJson from "./package.json";

const version = packageJson.version;

export default defineConfig({
  plugins: [solidPlugin({ extensions: ["ts"] })],
  resolve: {
    alias: {
      src: path.resolve("src/"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
    },
    exclude: ["csstype"],
  },
  define: {
    TON_UNITY_SDK: JSON.stringify(version),
  },
  build: {
    target: "esnext",
    outDir: "dist",
    emptyOutDir: true,
    minify: "terser",
    terserOptions: {
      format: {
        comments: false,
      },
    },
    sourcemap: true,
    lib: {
      formats: ["umd"],
      entry: path.resolve("src/index.ts"),
      name: "TON_UNITY_SDK",
      fileName: () => "ton-unity-sdk.min.js",
    },
  },
});
