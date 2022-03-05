import {Image} from "../entity/Image";
import {getConnection} from "typeorm";
import {Question} from "../entity/Question";
export class ImageController {
    static uploadImage = async (req, res) => {
        let image: Image = new Image();
        image.data = req.file.buffer;
        image.original_name = req.file.originalname;
        image.mimetype = req.file.mimetype;

        const result = await getConnection().createQueryBuilder()
            .insert()
            .into(Image)
            .values(image)
            .execute();

        res.send({id: result.raw.insertId});
    }
    static viewImage = async (req, res) => {
        const {id} = req.params;
        const db = getConnection()
            .getRepository(Image)
            .createQueryBuilder('image')
            .where('id = :id', {id})
        const image = await db.getOne();

        res.writeHead(200, {
            'Content-Type': image.mimetype,
            'Content-Length': image.data.length
        });

        res.end(image.data);
    }
    static uploadObjectiveImg = async (req, res) => {
        const {survey_id, question_index} = req.query;

        const img_objective = await getConnection().getRepository(Question)
            .find({where:{surveyId: survey_id}})

        let image: Image = new Image();
        image.data = req.file.buffer;
        image.original_name = req.file.originalname;
        image.mimetype = req.file.mimetype;
        image.question = img_objective[question_index];

        const result = await getConnection().createQueryBuilder()
            .insert()
            .into(Image)
            .values(image)
            .execute();

        res.send({id: result.raw.insertId});
    }

    static getObjectiveImg = async (req, res) => {
        const {question_id, image_index} = req.query;

        const images = await getConnection().getRepository(Image)
            .find({where:{questionId: question_id}})

        const image = images[image_index];

        res.writeHead(200, {
            'Content-Type': image.mimetype,
            'Content-Length': image.data.length
        });

        res.end(image.data)
    }

    static getImgBlob = async (req, res) => {
        const {question_id} = req.query;
        const image = await getConnection().getRepository(Image)
            .find({where:{questionId: question_id}});
        res.send(image)
    }
}

