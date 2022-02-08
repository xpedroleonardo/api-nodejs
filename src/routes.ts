import { Router } from "express";
import multer from "multer";

const route = Router();

import {
  authenticateExample,
  createExample,
  deleteExample,
  selectExample,
  selectOneExample,
  updateExample,
} from "./controller/ExampleController";

import { multerConfig } from "./config/multer";
import { ensureAuthenticated } from "./middieware/isAuthenticated";

route.get("/", selectExample); //List
route.post("/create", multer(multerConfig).single("avatar"), createExample); //Create
route.get("/details/:id", selectOneExample); //List One
route.put("/update/:id", multer(multerConfig).single("avatar"), updateExample); //Update
route.delete("/delete/:id", ensureAuthenticated, deleteExample); //Delete
route.post("/auth/", authenticateExample); //Create Auth

export default route;
