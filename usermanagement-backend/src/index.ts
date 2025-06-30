import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db";
import cors from "cors";
import http from "http"; // ✅ Import HTTP module
import cookieParser from "cookie-parser";
import FlightRoutes from "./routes/flightRoutes";

dotenv.config({ path: ".env.development" });

const app = express();

// ✅ CORS Configuration (Ensure WebSocket connection works)
app.use(
  cors({
    origin: "*", // ✅ Allow all origins
    credentials: true, // Will be ignored if origin is '*'
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// ✅ Explicitly handle CORS preflight requests
app.options("*", cors()); 
app.use(cookieParser());

// ✅ Create HTTP Server
const server = http.createServer(app);



// ✅ Middleware
app.use(express.json());
connectDb();
app.use("/api/v1/", FlightRoutes);

// ✅ Start the server (IMPORTANT: Use `server.listen`)
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
