// Production entry point for hosts that need a startup file (e.g. cPanel).
// Run `npm run build` first, then start with `node server.js`.
// Kept as CommonJS so any Node host can run it without extra flags.
/* eslint-disable @typescript-eslint/no-require-imports */
const { createServer } = require("node:http");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, "0.0.0.0", () => {
    console.log(`> Server listening on http://0.0.0.0:${port}`);
  });
});
