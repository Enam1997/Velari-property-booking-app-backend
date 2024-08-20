import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { User } from "../src/models/user.model.js";
import { Property } from "../src/models/property.modal.js";

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

const createPropertyTest = async (
  propertyName,
  propertyType,
  email,
  phoneNumber,
  roomTypes
) => {
  const user = await Property.create({
    propertyName,
    propertyType,
    email,
    phoneNumber,
    roomTypes,
  });
};

app.get("/property", (req, res) => {
  createPropertyTest(
    "Abesh Thikana",
    "Hotel",
    "mdenamaahhowdhuy@gmail.com",
    "01",
    { roomTypeName: "Luxury" }
  )
    .then(() => {
      res.send("Propert Created Perfectly");
    })
    .catch((err) => {
      console.log(err);

      res.send(err);
    });
});

// Routes Import

import userRouter from "./routes/user.routes.js";
import propertyRouter from "./routes/property.routes.js";

// routes declaration

app.use("/api/v1/users", userRouter);
app.use("/api/v1/property", propertyRouter);

export { app };
