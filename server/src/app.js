import express from "express";
const app = express();
import router from "./routes/auth.router.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import contactRoute from "./routes/contact.router.js";

app.use(express.json());
app.use("/api/auth", router);
app.use("/api/form", contactRoute);
app.use(errorMiddleware);
export default app;
