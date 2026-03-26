import z from "zod";
import { required } from "zod/mini";

const signUpSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "name is must be more than 255 character" })
    .max(255, { message: "name must not be more than 255 character" }),

  email: z
    .string({ required_error: "email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email is must be at least 3 character" })
    .max(255, { message: "Email must not be more than 255 character" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "phone is must be at least 10 character" })
    .max(20, { message: "phone must not be more than 20 character" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "password is must be at least 6 character" })
    .max(1050, { message: "password must not be more than 1050 character" }),
});

export default signUpSchema;
