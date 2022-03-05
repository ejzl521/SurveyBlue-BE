import {Router} from "express";
import {AuthMiddleware} from "../middleware/AuthMiddleware";
import survey from "./survey";
import result from "./result";
import admin from "./admin";
import auth from "./auth";
import image from "./image";
import user from "./user";

const routes = Router();

routes.use('/survey', survey);
routes.use('/result', result);
routes.use('/auth', auth);
routes.use('/admin', AuthMiddleware.verifyToken, AuthMiddleware.hasRole, admin);
routes.use('/image', image)
routes.use('/user', user)

export default routes;