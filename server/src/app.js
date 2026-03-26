import express from "express";
const app = express();
import router from "./routes/auth.router.js";
import errorMiddleware from "./middlewares/error.middleware.js";

app.use(express.json());
app.use(errorMiddleware);
app.use("/api/auth", router);

export default app;
