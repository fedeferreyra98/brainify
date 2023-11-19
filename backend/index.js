import express from "express";
import bodyParser from "body-parser";
import providerRoutes from "./routes/provider.js";
import serviceRoutes from "./routes/service.js";
import commentRoutes from "./routes/comment.js";
import hiringRoutes from "./routes/hiring.js";

// Initialize express application and configure it
const app = express();
const PORT = 5000; // Since frontend apps are usually running on port 3000. let's use 5000

// This module allow us to parse request body
app.use(bodyParser.json());

// Routes
app.use("/api/provider", providerRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/hiring", hiringRoutes);

// Declaration example for a get endpoint
app.get("/api/ping", (req, res) => {
    res.send({ "" :"pong" });
    }
);


app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`)});




