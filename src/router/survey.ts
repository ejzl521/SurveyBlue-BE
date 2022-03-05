import {Router} from "express";
import {SurveyController} from "../controller/SurveyController";
import {AuthMiddleware} from "../middleware/AuthMiddleware";

const multer = require('multer');
const routes = Router();

routes.post('', SurveyController.addSurvey);
routes.get('/list', SurveyController.getAllSurvey);
routes.get('/count', SurveyController.getAllSurvey);
routes.get('/:id', SurveyController.getOneSurvey);
routes.put('/:id', SurveyController.updateSurvey);
routes.delete('/:id',SurveyController.removeSurvey);

export default routes;