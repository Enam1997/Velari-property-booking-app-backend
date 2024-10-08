import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { User } from "../src/models/user.model.js";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

const createUserTest = async (
  fullName,
  avatar,
  coverImage,
  email,
  password,
  username
) => {
  const user = await User.create({
    fullName,
    avatar,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
};

app.get("/", (req, res) => {
  res.send("Hellow world bangladesh");
});

app.get("/create", (req, res) => {
  createUserTest(
    "Md Enam Ahmed",
    "https://images.pexels.com/photos/39853/woman-girl-freedom-happy-39853.jpeg?cs=srgb&dl=pexels-jill-wellington-1638660-39853.jpg&fm=jpg",
    "",
    "mdenamaahmedchowdhuy@gmail.com",
    "enam123",
    "enampower1"
  )
    .then(() => {
      res.send("User Created");
    })
    .catch((err) => {
      console.log(err);

      res.send(err);
    });
});

// Routes Import

import userRouter from "./routes/user.routes.js";
import propertyRouter from "./routes/property.routes.js";
import bookingRouter from "./routes/booking.routes.js";

// routes declaration

app.use("/api/v1/users", userRouter);
app.use("/api/v1/property", propertyRouter);
app.use("/api/v1/booking", bookingRouter);

export { app };
