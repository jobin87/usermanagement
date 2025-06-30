"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http")); // ✅ Import HTTP module
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const flightRoutes_1 = __importDefault(require("./routes/flightRoutes"));
dotenv_1.default.config({ path: ".env.development" });
const app = (0, express_1.default)();
// ✅ CORS Configuration (Ensure WebSocket connection works)
app.use((0, cors_1.default)({
    origin: "*", // ✅ Allow all origins
    credentials: true, // Will be ignored if origin is '*'
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// ✅ Explicitly handle CORS preflight requests
app.options("*", (0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// ✅ Create HTTP Server
const server = http_1.default.createServer(app);
// ✅ Middleware
app.use(express_1.default.json());
(0, db_1.connectDb)();
app.use("/api/v1/", flightRoutes_1.default);
// ✅ Start the server (IMPORTANT: Use `server.listen`)
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
