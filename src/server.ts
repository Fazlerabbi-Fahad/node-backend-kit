import { Server } from "http";
import { app } from "./app";
import config from "./config";

process.on("uncaughtException", (error) => {
  console.error(error);
  process.exit(1);
});

let server: Server;

//#region CONNECT DATABASE
async function bootstrap() {
  try {
    // await mongoose.connect(Config.database_url as string);
    // console.log("Database is connected successfully");

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch {
    console.log("Failed to connect database", config.port);
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();
//#endregion CONNECT DATABASE


//#region SIGNAL RECEIVED
process.on("SIGTERM", () => {
  // console.log("SIGTERM is received");
  if (server) {
    server.close();
  }
});
//#endregion SIGNAL RECEIVED
