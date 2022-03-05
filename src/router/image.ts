import {Router} from "express";
import {ImageController} from "../controller/ImageController";

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() })

const routes = Router();
routes.post('/upload', upload.single('file'), ImageController.uploadImage);
routes.get('/view/:id', ImageController.viewImage);
routes.post('/upload_img_obj', upload.single('file'), ImageController.uploadObjectiveImg);
routes.get('/get_objective_img', ImageController.getObjectiveImg)
routes.get('/blob', ImageController.getImgBlob);

export default routes;