import {Router } from "express";

const workflowRouter = Router();

workflowRouter.get("/", (req, res) => res.send({title: "Get All Workflows"}))



export default workflowRouter;