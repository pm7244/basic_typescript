import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import path from "path";

import router from "./route/route";
import webRouter from "./route/webRoute";
import { connectDB } from "./config/db";

dotenv.config();

connectDB();

const app = express();

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "upload")));

// session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// routes
app.use("/", webRouter);
app.use("/api", router);

// server
// const PORT = process.env.PORT || 3001;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

export default app;