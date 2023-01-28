const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { bgCyan } = require("colors");
require("colors");
const connectDb = require("./config/config");
//dotenv config
dotenv.config();

//db config
connectDb();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

//routes
app.use("/api/products", require("./routes/productsRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api", require("./routes/billsRoutes"));

//Create port
const PORT = process.env.PORT || 5000; // or

//Listen
app.listen(PORT, () => {
  console.log(
    `Serve at running on the post : http://localhost:${PORT}`.bgCyan.white
  );
});
