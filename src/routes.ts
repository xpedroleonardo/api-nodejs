import { Router } from "express";

const route = Router();

import {
  createExample,
  deleteExample,
  selectExample,
  selectOneExample,
  updateExample,
} from "./controller/ExampleController";

route.get("/", selectExample); //List
route.post("/create", createExample); //Create
route.get("/details/:id", selectOneExample); //List One
route.put("/update/:id", updateExample); //Update
route.delete("/delete/:id", deleteExample); //Delete

export default route;
