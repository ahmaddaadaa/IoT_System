import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("IoT Backend – Stage 1 Running");
});

export default app;