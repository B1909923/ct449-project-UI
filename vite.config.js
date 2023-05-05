import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    server: {
        host: "localhost",
        port: process.env.PORT || "5001",
        proxy: {
            "/api": {
                target: process.env.SV_URI || "https://localhost/5000/",
                changeOrigin: true,
            },
        },
    },
});
