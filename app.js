import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./db/db.js";
import contactsRouter from "./routes/contactsRouter.js";


dotenv.config();
const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});
