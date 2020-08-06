require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const middlewares = require("./middlewares");
const mongoose = require("mongoose");

const logs = require("./api/logs");

const app = express();

// Mongoose / MongoDB connection
mongoose.connect(process.env.DATABASE_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

app.use(morgan("common")); // General logger
app.use(helmet()); // modify default response headers
app.use(cors({ origin: process.env.CORS_ORIGIN })); // enable cors
app.use(express.json()); // body parser

app.get("/", (req, res) => {
   res.json({ message: "Hello world" });
});

// Routes
app.use("/api/logs", logs);

// unknown route handler
app.use(middlewares.notFound);

// Error handler
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () =>
   console.log(`Server running at http://localhost:${port}`)
);
