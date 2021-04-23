import express from "express";
import "express-async-errors";
import cors from "cors";
import "../database/connection";
import errorHandler from "../errors/handler";
import routes from "./routes";
import jwt from "../application/jwt";
import compression from "compression";

require("dotenv").config()

const app = express();

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(jwt());
app.use(routes);
app.use(errorHandler);

app.listen(process.env.PORT || 3333);
