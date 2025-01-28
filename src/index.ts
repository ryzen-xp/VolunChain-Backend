import "dotenv/config";
import "reflect-metadata";
import express from "express";
import AppDataSource from "./config/ormconfig";
import { errorHandler } from "./middlewares/errorHandler";
import { initializeDatabase } from "./config/ormconfig";


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("VolunChain API is running!");
});

// Error handler middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  errorHandler(err, req, res, next);
});

// Initialize the database and start the server
initializeDatabase()
  .then(() => {
    console.log("Database connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during database initialization:", error);
  });
