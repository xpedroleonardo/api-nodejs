import { Router } from "express";
import multer from "multer";

const route = Router();

import {
  createExample,
  deleteExample,
  selectExample,
  selectOneExample,
  updateExample,
} from "./controller/ExampleController";

import { multerConfig } from "./config/multer";

route.get("/", selectExample); //List
route.post("/create", multer(multerConfig).single("avatar"), createExample); //Create
route.get("/details/:id", selectOneExample); //List One
route.put("/update/:id", multer(multerConfig).single("avatar"), updateExample); //Update
route.delete("/delete/:id", deleteExample); //Delete

route.post("/auth/"); //Create Auth
route.get("/auth/"); //List Auth

export default route;
