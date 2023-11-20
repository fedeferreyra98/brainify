import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.js";
import serviceRoutes from "./routes/service.js";
import commentRoutes from "./routes/comment.js";
import hiringRoutes from "./routes/hiring.js";
import process from "process";
import "dotenv/config";
import "./database/connection.js";
import cookieParser from "cookie-parser";

// Initialize express application and configure it
const app = express();
const PORT = process.env.PORT || 4000; // Since frontend apps are usually running on port 3000. let's use 4000

const whitelist = [process.env.ORIGIN]

app.use(cookieParser());
app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || whitelist.includes(origin)) {
          return callback(null, true);
        }
        return callback("Not allowed by CORS");
      },
      credentials: true, 
    })
  );
// This module allow us to parse request body
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/hiring", hiringRoutes);

// Declaration example for a get endpoint
app.get("/api/ping", (req, res) => {
    res.send({ "" :"pong" });
    }
);


app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`)});




