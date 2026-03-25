import express from "express";
const app = express();

app.use(express.json());

app.get("/home", (req, res) => {
  res.status(200).send("hello home");
});

export default app;
