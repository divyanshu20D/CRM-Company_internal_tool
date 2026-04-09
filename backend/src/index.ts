import pino from "pino";

import { createApp } from "./app.js";

const logger = pino({
  name: "crm-backend",
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
});

const port = Number(process.env.PORT ?? 4000);
const app = createApp();

app.listen(port, () => {
  logger.info(`Backend server running on http://localhost:${port}`);
});
