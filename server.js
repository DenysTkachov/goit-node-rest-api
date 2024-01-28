const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./db"); 

const contactsRouter = require("./routes/contactsRouter"); 

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});