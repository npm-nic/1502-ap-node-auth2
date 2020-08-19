const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");

const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.get("/hello", (req, res) => {
  res.status(200).json({ hello: `server` });
});

module.exports = app;
