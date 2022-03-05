import {Router} from "express";
import {ResultController} from "../controller/ResultController";

const routes = Router();

routes.post('', ResultController.addResult);
routes.get('/list', ResultController.getAllResult);
routes.get('/:survey_id', ResultController.getAnswers);
routes.get('/user_result/:user_id', ResultController.getUserResponseSurvey);

export default routes;