import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers)


userRouter.get("/:id", getUser)


userRouter.post("/", (req, res) => res.send({title: "Create New User"}))

userRouter.put("/:id", (req, res) => res.send({title: "update User by ID"}))




userRouter.delete("/:id", (req, res) => res.send({title: "Delete User by ID"}))



export default userRouter;