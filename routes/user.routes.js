import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => res.send({title: "Get All the Users"}))


userRouter.get("/:id", (req, res) => res.send({title: "Get User by ID"}))


userRouter.post("/", (req, res) => res.send({title: "Create New User"}))

userRouter.put("/:id", (req, res) => res.send({title: "update User by ID"}))




userRouter.delete("/:id", (req, res) => res.send({title: "Delete User by ID"}))



export default userRouter;