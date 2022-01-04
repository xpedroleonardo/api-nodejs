import express from "express";
import route from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(route);

app.listen(3333, () => console.log("Runnig in http://localhost:3333"));
