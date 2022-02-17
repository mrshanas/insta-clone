import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/auth", userRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect("mongodb://localhost:27017/goalsDB")
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Server started on port ${PORT} and connected to the database`
      )
    )
  )
  .catch((error) => console.log(error));
