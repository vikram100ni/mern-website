import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  const hash_password = await bcrypt.hash(this.password, salt);
  this.password = hash_password;
});

userSchema.methods.genrateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id,
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      },
    );
  } catch (error) {
    console.error(error);
  }
};
userSchema.methods.comparePassword = async function (Password) {
  return await bcrypt.compare(Password, this.password);
};
export const User = mongoose.model("User", userSchema);
