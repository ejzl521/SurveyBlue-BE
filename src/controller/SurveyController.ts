import {Survey} from "../entity/Survey";
import {Question} from "../entity/Question";
import {User} from "../entity/User";
import {getConnection} from "typeorm";
import {Image} from "../entity/Image";
import {Result} from "../entity/Result";

export class SurveyController {

    static addSurvey = async (req, res) => {
        const {title, questions, user_id} = req.body;
        const user = await getConnection().getRepository(User).findOne({id: user_id});
        const survey = new Survey();
        survey.title = title;
        survey.user = user;
        const result = await getConnection().getRepository(Survey).save(survey);

        for (const item of questions) {
            let question: Question = new Question();
            question = item;
            question.survey = result;
            const a = await getConnection().getRepository(Question).save(question);
            console.log(a)
        }

        res.send({survey_id: result.id});
    }

    static getAllSurvey = async (req, res) => {
        const {user_id, page_number, page_size} = req.query;
        const options = {};
        options["order"] = {id: "DESC"}
        options['relations'] = ["user"]
        if (user_id) {
            options['where'] = {userId: user_id}
        }
        if (page_number && page_size) {
            options['skip'] = (page_number - 1) * page_size;
            options['take'] = page_size
        }
        const surveys = await getConnection().getRepository(Survey).find(options);
        const total = await getConnection().getRepository(Survey).count()

        res.send({surveys: surveys, total: total, page_number:page_number, page_size: page_size});
    }

    static getOneSurvey = async (req, res) => {
        const {id} = req.params;
        const survey = await getConnection().getRepository(Survey)
            .findOne({relations: ["questions", "user"], where: {id: id}})

        for (let i = 0; i < survey.questions.length; i++) {
            if (survey.questions[i].type === "img_objective") {
                const img_count = await getConnection().getRepository(Image)
                    .count({where: {questionId: survey.questions[i].id}})
                console.log(img_count);
                const question = {...survey.questions[i], img_count: img_count}
                survey.questions[i] = question;
            }
        }
        res.send(survey);
    }

    static updateSurvey = async (res, req) => {
        const {id} = res.params;
        const {title, questions} = res.body

        await getConnection().createQueryBuilder()
            .delete().from(Question).where("surveyId = :id", {id})
            .execute();

        await getConnection().createQueryBuilder()
            .delete().from(Result).where("surveyId = :id", {id})
            .execute();

        const updateOption = {};
        updateOption['title'] = title;

        await getConnection().createQueryBuilder().update(Survey)
            .set(updateOption).where("id = :id", {id})
            .execute();

        const survey = await getConnection().getRepository(Survey).findOne({id: id})
        for (const item of questions) {
            let question: Question = new Question();
            question = item;
            question.survey = survey;
            await getConnection().getRepository(Question).save(question);
        }

        req.send({survey_id: survey.id});
    }

    static removeSurvey = async (req, res) => {
        const {id} = req.params;
        const result = await getConnection().createQueryBuilder()
            .delete().from(Survey).where("id = :id", {id})
            .execute();
        res.send(result)
    }


}