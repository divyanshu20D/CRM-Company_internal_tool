import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { pinoHttp } from "pino-http";

dotenv.config();

export const createApp = () => {
  const app = express();

  app.use(
    cors({
      origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
      credentials: true,
    }),
  );
  app.use(helmet());
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    pinoHttp({
      quietReqLogger: true,
    }),
  );

  app.get("/health", (_request, response) => {
    response.status(200).json({
      ok: true,
      service: "crm-backend",
      timestamp: new Date().toISOString(),
    });
  });

  return app;
};
