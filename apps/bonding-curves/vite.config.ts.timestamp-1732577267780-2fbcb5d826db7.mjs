// vite.config.ts
import { vitePlugin as remix } from "file:///Users/auroter/Dev/lazer/intuition/intuition-ts/node_modules/.pnpm/@remix-run+dev@2.9.2_@remix-run+react@2.9.2_react-dom@18.3.1_react@18.3.1__react@18.3.1_types_2cyofom7uo5qahrvyrmrpd3yxm/node_modules/@remix-run/dev/dist/index.js";
import { defineConfig } from "file:///Users/auroter/Dev/lazer/intuition/intuition-ts/node_modules/.pnpm/vite@5.2.13_@types+node@20.14.2_terser@5.31.1/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///Users/auroter/Dev/lazer/intuition/intuition-ts/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.4.5_vite@5.2.13_@types+node@20.14.2_terser@5.31.1_/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/.*"]
    }),
    tsconfigPaths()
  ],
  server: {
    port: 3e3,
    host: "0.0.0.0"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYXVyb3Rlci9EZXYvbGF6ZXIvaW50dWl0aW9uL2ludHVpdGlvbi10cy9hcHBzL2JvbmRpbmctY3VydmVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYXVyb3Rlci9EZXYvbGF6ZXIvaW50dWl0aW9uL2ludHVpdGlvbi10cy9hcHBzL2JvbmRpbmctY3VydmVzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hdXJvdGVyL0Rldi9sYXplci9pbnR1aXRpb24vaW50dWl0aW9uLXRzL2FwcHMvYm9uZGluZy1jdXJ2ZXMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyB2aXRlUGx1Z2luIGFzIHJlbWl4IH0gZnJvbSAnQHJlbWl4LXJ1bi9kZXYnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlbWl4KHtcbiAgICAgIGlnbm9yZWRSb3V0ZUZpbGVzOiBbJyoqLy4qJ10sXG4gICAgfSksXG4gICAgdHNjb25maWdQYXRocygpLFxuICBdLFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiAzMDAwLFxuICAgIGhvc3Q6ICcwLjAuMC4wJyxcbiAgfSxcbn0pOyAiXSwKICAibWFwcGluZ3MiOiAiO0FBQTJYLFNBQVMsY0FBYyxhQUFhO0FBQy9aLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sbUJBQW1CO0FBRTFCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxNQUNKLG1CQUFtQixDQUFDLE9BQU87QUFBQSxJQUM3QixDQUFDO0FBQUEsSUFDRCxjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
