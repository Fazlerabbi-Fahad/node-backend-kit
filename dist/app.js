"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_status_1 = __importDefault(require("http-status"));
exports.app = (0, express_1.default)();
//#region  PARSING JSON
exports.app.use((0, cors_1.default)());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
//#endregion PARSING JSON
//#region ROUTES
// app.use("/api/v1", router);
//#endregion ROUTES
//#region  GLOBAL ERROR HANDLER
// app.use(globalErrorHandler);
exports.app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
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
