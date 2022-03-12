import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/", postRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost:27017/instaDB")
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Server started on port ${PORT} and connected to the database`
      )
    )
  )
  .catch((err) => console.log(err));
