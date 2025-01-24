"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const ormconfig_1 = __importDefault(require("./config/ormconfig"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware for parsing JSON requests
app.use(express_1.default.json());
// Health check route
app.get("/", (req, res) => {
    res.send("VolunChain API is running!");
});
// Initialize the database and start the server
ormconfig_1.default.initialize()
    .then(() => {
    console.log("Database connected successfully!");
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error("Error during database initialization:", error);
});
