const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

const movieRoutes = require("./src/routes/movieRoutes");
app.use("/movies", movieRoutes);

const commentRoutes = require("./src/routes/commentRoutes");
app.use("/movies", commentRoutes);

const authRouter = require("./src/routes/authRoutes");
app.use("/user", authRouter);


module.exports = app;
