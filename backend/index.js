import express from "express";
import bodyParser from "body-parser";
import providersRoutes from "./routes/providers.js";
import servicesRoutes from "./routes/services.js";

// Initialize express application and configure it
const app = express();
const PORT = 5000; // Since frontend apps are usually running on port 3000. let's use 5000

// This module allow us to parse request body
app.use(bodyParser.json());

// Routes
app.use("/api/providers", providersRoutes);
app.use("/api/services", servicesRoutes);

// Declaration example for a get endpoint
app.get("/api/hello", (req, res) => {
    res.send({ express: "Hello From Express" });
    }
);


app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`)});




