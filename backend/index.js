import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./src/routes/user.js";
import authRoutes from "./src/routes/auth.js";
import serviceRoutes from "./src/routes/service.js";
import commentRoutes from "./src/routes/comment.js";
import hiringRoutes from "./src/routes/hiring.js";
import process from "process";
import "dotenv/config";
import "./src/database/connection.js";
import cookieParser from "cookie-parser";

// Initialize express application and configure it
const app = express();
const PORT = process.env.PORT || 4000; // Since frontend apps are usually running on port 3000. let's use 4000

const whitelist = [process.env.ORIGIN]

app.use(cookieParser());
app.use(
    cors({
      origin: whitelist,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // los métodos que quieres permitir
      credentials: true // si necesitas manejar cookies
    })
  );
// This module allow us to parse request body
app.use(bodyParser.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/hiring", hiringRoutes);

// Declaration example for a get endpoint
app.get("/api/ping", (req, res) => {
    res.send({ "" :"pong" });
    }
);


app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`)});




