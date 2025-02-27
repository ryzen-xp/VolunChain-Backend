import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { prisma } from "./config/prisma";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("VolunChain API is running!");
});

// Initialize the database and start the server
prisma.$connect()
  .then(() => {
    console.log("Database connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during database initialization:", error);
  });
