"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = __importDefault(require("./config"));
process.on("uncaughtException", (error) => {
    console.error(error);
    process.exit(1);
});
let server;
//#region CONNECT DATABASE
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // await mongoose.connect(Config.database_url as string);
            // console.log("Database is connected successfully");
            server = app_1.app.listen(config_1.default.port, () => {
                console.log(`Example app listening on port ${config_1.default.port}`);
            });
        }
        catch (_a) {
            console.log("Failed to connect database", config_1.default.port);
        }
        process.on("unhandledRejection", (error) => {
            if (server) {
                server.close(() => {
                    console.error(error);
                    process.exit(1);
                });
            }
            else {
                process.exit(1);
            }
        });
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
