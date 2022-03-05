import {User} from "../entity/User";
import {getConnection} from "typeorm";
import {compareSync, hashSync} from "bcryptjs";
import {Survey} from "../entity/Survey";
import {Result} from "../entity/Result";

export class UserController {

    static getUserInfo = async (req, res) => {
        const {id} = req.params;
        // 등록한 설문조사
        const request_total = await getConnection().getRepository(Survey).count({where:{userId: id}});
        // 응답한 설문조사
        const response_total = await getConnection().getRepository(Result).count({where:{userId: id}});
        // 유저 이메일, 이름
        const email_username = await getConnection().getRepository(User)
            .findOne({select:["email","username"], where:{id: id}})
        res.send({
            request_total: request_total,
            response_total: response_total,
            email: email_username.email,
            username: email_username.username
        })
    }

    static changePassword = async (req, res) => {
        const {password, changed_password, user_id} = req.body
        const user = await getConnection().getRepository(User)
            .findOne({where: {id: user_id}});

        if (!compareSync(password, user.password)) {
            return res.status(400).send({ message: "Invalid password" });
        }

        const updateOption = {};
        updateOption['password'] = hashSync(changed_password, 8);

        await getConnection().createQueryBuilder().update(User)
            .set(updateOption).where("id = :user_id", {user_id})
            .execute();
        res.send({message: "password change complete"})
    }

    static resetPassword = async (req, res) => {
        const {user_email} = req.body;

        const existEmail = await getConnection().getRepository(User)
            .findOne({where:{email: user_email}});

        if (!existEmail) {
            res.status(400).send({ message: "존재하지 않는 이메일입니다!" })
        }

        let pwd = "";
        for (let i = 0; i < 16; i++) {
            let randVal = Math.floor(Math.random() * 36);
            if (randVal < 10) {
                pwd += randVal.toString();
            } else {
                randVal += 55;
                pwd += String.fromCharCode(randVal);
            }
        }

        const updateOption = {};
        updateOption['password'] = hashSync(pwd, 8);

        await getConnection().createQueryBuilder().update(User)
            .set(updateOption).where("email = :user_email", {user_email})
            .execute();

        res.send({pwd, username: existEmail.username})
    }
}