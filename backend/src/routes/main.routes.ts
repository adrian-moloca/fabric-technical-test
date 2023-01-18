import express from "express";
import testRoutes from "./test.routes";

const mainRoutes = express.Router();

mainRoutes.use('/tests', testRoutes);

export default mainRoutes;
