import {Router} from "express";
import {AuthController} from "../controller/AuthController";

const routes = Router();

routes.post('/signup', AuthController.signUp);
routes.post('/signin', AuthController.signIn);
export default routes;