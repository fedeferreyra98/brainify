import express from "express";
import bodyParser from "body-parser";

// Initialize express application and configure it
const app = express();
const PORT = 5000; // Since frontend apps are usually running on port 3000. let's use 5000

// This module allow us to parse request body
app.use(bodyParser.json());

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`)});




