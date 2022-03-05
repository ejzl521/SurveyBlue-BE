import {getConnection} from "typeorm";
import {User} from "../entity/User";
import {Survey} from "../entity/Survey";
import {Question} from "../entity/Question";
import {Result} from "../entity/Result";
import {Answer} from "../entity/Answer";
import {Image} from "../entity/Image";
import user from "../router/user";

export class ResultController{
    static addResult = async (req, res) => {
        const {user_id, survey_id, answers} = req.body;

        const user = await getConnection().getRepository(User).findOne({id: user_id})
        const survey = await getConnection().getRepository(Survey).findOne({id: survey_id})

        const questions = await getConnection().getRepository(Question)
            .find({surveyId: survey_id})

        const result = new Result();
        result.user = user;
        result.survey = survey;
        result.title = survey.title;

        const result_ = await getConnection().getRepository(Result).save(result);

        for (let i = 0; i < questions.length; i++){
            let answer = new Answer();
            answer.type = questions[i].type;
            answer.title = questions[i].title;
            answer.answer = answers[i];
            answer.question = questions[i];
            answer.result = result_;
            await getConnection().getRepository(Answer).save(answer);
        }

        res.send(await getConnection().getRepository(Result)
            .find({relations:["answers"]}));
    }

    static getAllResult = async (req, res) => {
        const all_results = await getConnection().getRepository(Result)
            .find({relations:["answers"]})

        res.send(all_results)
    }

    static getAnswers = async(req ,res) => {
        const {survey_id} = req.params;

        const survey_title = await getConnection().getRepository(Survey).
            findOne({where: {id: survey_id}, select: ["title"]})

        const all_answer = await getConnection().getRepository(Question).
            find({relations:["answers"],where: {surveyId: survey_id}});

        for (let i = 0; i < all_answer.length; i++) {
            if (all_answer[i].type === "img_objective") {
                const img_count = await getConnection().getRepository(Image)
                    .count({where: {questionId: all_answer[i].id}})
                const question = {...all_answer[i], img_count: img_count}
                all_answer[i] = question;
            }
        }
        res.send({...survey_title, answers: all_answer});
    }

    // 유저가 참여한 설문조사 id
    static getUserResponseSurvey = async(req, res) => {
        const {user_id} = req.params;
        console.log(user_id)
        const user_result = await getConnection().getRepository(Result)
            .find({select:["surveyId"], where:{userId: user_id}});
        const user_result_list = []
        for(const item of user_result){
            user_result_list.push(item.surveyId);
        }
        res.send(user_result_list);
    }
}