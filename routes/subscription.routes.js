import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send({ title: "Get All Subscriptions" }));


subscriptionRouter.get("/:id", (req, res) => res.send({ title: "Get Subscription by ID" }));


subscriptionRouter.post("/", (req, res) => res.send({ title: "Create New Subscription" }));



subscriptionRouter.put("/:id", (req, res) => res.send({ title: "Update Subscription by ID" }));


subscriptionRouter.delete("/:id", (req, res) => res.send({ title: "Delete Subscription by ID" })); 

subscriptionRouter.get("/user/:id", (req, res) => res.send({ title: "Get Subscription by User ID" }));

subscriptionRouter.get("/upcoming-renewals", (req, res) => res.send({ title: "Get Upcoming Renewals" }));


subscriptionRouter.put("/:id/cancel", (req, res) => res.send({ title: "Cancel Subscription by ID" }));





export default subscriptionRouter;