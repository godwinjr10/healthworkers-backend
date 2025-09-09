import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { testConnection, sequelize } from "./config/db.js";
import usersRoute from './router/users.js';
import authRoutes from './router/auth.js';
import profileRoutes from "./router/profile.js";
import performanceRoutes from "./router/performance.js";
import drugsRoute from "./router/drugsAdministered.js";
import drugsAdministeredRoutes from "./router/drugsAdministered.js";

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:3000", // local dev
  "https://healthworkersregistry.onrender.com" 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman / curl without origin
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.warn("Blocked CORS request from:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true, // allow cookies, sessions, etc.
}));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
testConnection();

// ❌ DO NOT sync tables — we manage them manually
// const syncDatabase = async () => {
//   await sequelize.sync(); // remove or comment out
// };
// syncDatabase();

app.use('/api/users', usersRoute);
app.use('/api/auth', authRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/drugs", drugsRoute);
app.use("/api/drugs-administered", drugsAdministeredRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
