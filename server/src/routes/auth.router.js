import { Router } from "express";
const router = Router();
import authControllers from "../controllers/auth.controller.js";
import signUpSchema from "../validator/auth.validator.js";
import validate from "../middlewares/validate.middleware.js";

router.route("/home").get((req, res) => {
  res.send("routing workingssss");
});

router
  .route("/register")
  .post(validate(signUpSchema), authControllers.register);
router.route("/login").post(authControllers.login);

export default router;
