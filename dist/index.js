"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const route_1 = __importDefault(require("./route/route")); // API routes
const webRoute_1 = __importDefault(require("./route/webRoute"));
const db_1 = require("./config/db");
dotenv_1.default.config();
(0, db_1.connectDB)();
const app = (0, express_1.default)();
// Resolve paths correctly - public and views stay in src
const srcDir = __dirname.includes("dist") ? path_1.default.join(__dirname, "../") : __dirname;
// view engine
app.set("view engine", "ejs");
app.set("views", path_1.default.join(srcDir, "src/views"));
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json({ limit: "50mb" }));
// Static files
app.use(express_1.default.static(path_1.default.join(srcDir, "src/public")));
app.use(express_1.default.static(path_1.default.join(srcDir, "src/upload")));
app.use("/api/transform", express_1.default.static(path_1.default.join(srcDir, "src/upload")));
// session
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "yourSecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));
// routes
app.use("/", webRoute_1.default);
app.use("/api", route_1.default);
// server
const PORT = parseInt(process.env.PORT || "3009", 10);
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Stop the other process or set a different PORT in .env.`);
        process.exit(1);
    }
    console.error("Server error:", error);
    process.exit(1);
});
exports.default = app;
