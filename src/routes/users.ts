import { Router } from "express";
import { loginUser, getMe, createUser } from "../controllers/users";
import { isAuthenticated } from "../middlewares/auth";

const userRouter = Router();

userRouter.route("/auth").post(loginUser);
userRouter.route("/user").get(isAuthenticated, getMe).post(createUser);
userRouter.route("/user/:id").get(getMe).put(getMe).delete(getMe);

export default userRouter;
