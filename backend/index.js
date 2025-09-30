import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRouter from "./routes/userRouter.js";

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use("/users", userRouter);

mongoose
  .connect(
    "mongodb+srv://admin:1234@cluster0.ifdfckn.mongodb.net/sameera?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.listen(5000, () => console.log("Server running on port 5000"));
