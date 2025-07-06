import { Application, NextFunction, Request, Response } from "express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import httpStatus from "http-status";

export const app: Application = express();

//#region  PARSING JSON
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//#endregion PARSING JSON

//#region ROUTES
// app.use("/api/v1", router);
//#endregion ROUTES


//#region  GLOBAL ERROR HANDLER
// app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessage: [
      {
        path: req.originalUrl,
        message: "API not found",
      },
    ],
  }),
    next();
});
//#endregion GLOBAL ERROR HANDLER