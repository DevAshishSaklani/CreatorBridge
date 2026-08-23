import express from "express";
import fs from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Locate the built client assets.
 *
 * Two layouts are supported, so this works whether the server was bundled or is
 * being run straight from source — no NODE_ENV needed (which also keeps the
 * `start` script portable across Windows and POSIX shells):
 *   - bundled  → dist/index.js       → ./public
 *   - from src → server/index.ts     → ../dist/public
 */
function resolveStaticPath(): string | null {
  const candidates = [
    path.resolve(__dirname, "public"),
    path.resolve(__dirname, "..", "dist", "public"),
  ];
  return (
    candidates.find(dir => fs.existsSync(path.join(dir, "index.html"))) ?? null
  );
}

async function startServer() {
  const staticPath = resolveStaticPath();

  if (!staticPath) {
    console.error(
      "No client build found. Run `pnpm build` before starting the server."
    );
    process.exitCode = 1;
    return;
  }

  const indexHtml = path.join(staticPath, "index.html");
  const app = express();
  const server = createServer(app);

  app.use(express.static(staticPath));

  // SPA fallback. Registered as middleware rather than app.get("*") because the
  // "*" string path is valid in Express 4 but throws in Express 5.
  app.use((req, res, next) => {
    // Only HTML navigations should fall back; a missing asset or API route
    // must not receive index.html with a 200.
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    if (req.path.startsWith("/api/")) return next();
    if (!req.accepts("html")) return next();

    res.sendFile(indexHtml, err => {
      if (err) next(err);
    });
  });

  const port = Number(process.env.PORT) || 3000;

  server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use.`);
      process.exitCode = 1;
      return;
    }
    console.error(err);
    process.exitCode = 1;
  });

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    console.log(`Serving ${staticPath}`);
  });
}

startServer().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
