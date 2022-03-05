import {AdminController} from "../controller/AdminController";
import {Router} from "express";

const routes = Router();
routes.get('/dashboard', AdminController.getDashboard);

export default routes;