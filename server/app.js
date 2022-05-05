import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";
import AdminJs from "adminjs";
import AdminExpress from "@adminjs/express";
import AdminMongoose from "@adminjs/mongoose";
import User from "./models/userModel.js";
import Post from "./models/postModel.js";
import Comment from "./models/comment.js";

const app = express();

AdminJs.registerAdapter(AdminMongoose);

const adminJs = new AdminJs({
  databases: [],
  rootPath: "/admin",
  resources: [Post, User, Comment],
});

const adminRouter = AdminExpress.buildRouter(adminJs);

app.use(adminJs.options.rootPath, adminRouter);
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
        `Server started on port ${PORT} and connected to the database and admin path is on /admin`
      )
    )
  )
  .catch((err) => console.log(err));
