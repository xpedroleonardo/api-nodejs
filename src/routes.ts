import { Router } from "express";

const route = Router();

route.get("/", () => {}); //List
route.post("/create", () => {}); //Create
route.get("/details/:id", () => {}); //List One
route.put("/update/:id", () => {}); //Update
route.delete("/delete/:id", () => {}); //Delete

export default route;
