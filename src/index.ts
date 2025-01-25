import "dotenv/config";
import "reflect-metadata";
import express from "express";
import AppDataSource from "./config/ormconfig";
import AuthService from "./services/AuthService";
import authMiddleware from "./middleware/authMiddleware";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("VolunChain API is running!");
});

// Authentication route
app.post("/auth/login", async (req, res) => {
  const { walletAddress } = req.body;

  try {
    const token = await AuthService.authenticate(walletAddress);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// Protected route example
app.get("/protected", authMiddleware, (req, res) => {
  res.send(`Hello ${req.user.role}, your ID is ${req.user.id}`);
});

// Initialize the database and start the server
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during database initialization:", error);
  });