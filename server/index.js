import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.config.js";
import authRouter from "./routes/auth.route.js";
import budgetRouter from "./routes/budget.route.js";
import expenseRouter from "./routes/expense.route.js";
import statsRouter from "./routes/stats.route.js";

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const allowedOrigins = [
  'https://expenso-track-gex7.vercel.app', 
  'https://another-allowed-origin.com'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // if you need to include credentials like cookies, HTTP authentication
};

app.use(cors(corsOptions));
app.use("/api/auth", authRouter);
app.use("/api/budget", budgetRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/stats", statsRouter);

app.get("/", (req, res) => {
  return res.status(200).send({
    message: "Expense Tracker Base Route",
    client: process.env.CLIENT_URL,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).send({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
