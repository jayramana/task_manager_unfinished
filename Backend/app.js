const cors = require("cors")
const express = require("express");
const app = express();
const task = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();


app.get("/hi", (req, res) => {
  res.send("Hi");
});

app.use(express.json());

app.use(cors())

app.use("/api/v1/tasks", task);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, () => console.log("Server Listening"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
