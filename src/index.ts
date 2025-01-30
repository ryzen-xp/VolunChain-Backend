import "dotenv/config";
import "reflect-metadata";
import express from "express";

import { AppDataSource, redisClient } from "./config/ormconfig";
import authRoutes from "./routes/authRoutes";


const app = express();
const PORT = process.env.PORT || 3000;

console.info("Starting VolunChain API...");

// Middleware for parsing JSON requests
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("VolunChain API is running!");
});

// Health check route
app.get("/health", async (req, res) => {
  const healthStatus: Record<string, any> = {
    status: "ok",
    services: {},
  };
  const startTime = Date.now();

  // Checking database
  try {
    const start_time = Date.now();
    await AppDataSource.query("SELECT 1");
    const response_time = Date.now() - start_time;
    healthStatus.services.database = {
      status: "connected",
      responseTime: `${response_time}ms`,
    };
  } catch (err) {
    healthStatus.status = "unhealthy";
    healthStatus.services.database = { status: "disconnected" };
  }

  // Checking cache
  try {
    const start_time = Date.now();
    const redisPing = await redisClient.ping();
    const redis_response_time = Date.now() - start_time;
    healthStatus.services.cache = {
      status: redisPing === "PONG" ? "connected" : "disconnected",
      responseTime: `${redis_response_time}ms`,
    };
  } catch (err) {
    healthStatus.status = "unhealthy";
    healthStatus.services.cache = { status: "disconnected" };
  }

  const total_responseTime = Date.now() - startTime;
  healthStatus.responseTime = `${total_responseTime}ms`;

  const httpStatus = healthStatus.status === "ok" ? 200 : 503;
  res.status(httpStatus).json(healthStatus);
});

// Authentication routes
app.use("/auth", authRoutes);

// Initialize the database and start the server
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!");

    // initialize Redis
    initializeRedis()
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Server is running on http://localhost:${PORT}`);
        });
      })
      .catch((error) => {
        console.error(
          "Server failed to start due to Redis initialization error:",
          error
        );
      });
  })
  .catch((error) => {
    console.error("Error during database initialization:", error);
  });

// function to initialize Redis
const initializeRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis connected successfully!");
  } catch (error) {
    console.error("Error during Redis initialization:", error);
  }
};

