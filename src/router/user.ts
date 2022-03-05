import {Router} from "express";
import {UserController} from "../controller/UserController";

const routes = Router();

routes.get('/info/:id', UserController.getUserInfo);
routes.post('/change_password', UserController.changePassword);
routes.post('/reset_password', UserController.resetPassword);

export default routes;