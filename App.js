// const express = require("express");
import express from "express";
import mongoose from "mongoose";
import Hello from "./Hello.js";
import Courses from "./Courses/routes.js";
import Modules from "./Modules/routes.js";
import cors from "cors";
import session from "express-session";
import SessionExercises from "./SessionExercises.js";
import Users from "./Users/routes.js";
import LikesRoutes from "./Napster/likes/routes.js";
import ChatCompletionRoutes from "./openai/chat/routes.js";
import ImageGenerationRoutes from "./openai/images/routes.js";
import VisionRoutes from "./openai/vision/routes.js";
import Text2SpeechRoutes from "./openai/tts/routes.js";
import SpeechToTextRoutes from "./openai/stt/routes.js";
import { join } from "path";

// mongoose.connect("mongodb://localhost:27017/kanbas-sp24-tue");
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use("/speech", express.static(join(process.cwd(), "openai/tts")));

Hello(app);
Courses(app);
Modules(app);
SessionExercises(app);
Users(app);
LikesRoutes(app);
ChatCompletionRoutes(app);
ImageGenerationRoutes(app);
VisionRoutes(app);
Text2SpeechRoutes(app);
SpeechToTextRoutes(app);

app.listen(4000);
