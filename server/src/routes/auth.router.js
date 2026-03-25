import { Router } from "express";
const router = Router();
import authControllers from "../controllers/auth.controller.js";

router.route("/home").get((req, res) => {
  res.send("routing workingssss");
});

router.route("/register").post(authControllers.register);
router.route("/login").post(authControllers.login);

export default router;
