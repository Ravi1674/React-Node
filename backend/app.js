const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use("/", router);
mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        app.listen(3001);
        console.log(
            "Database connection successful! Listening to localhost 3001"
        );
    })
    .catch((err) => console.log(err));
