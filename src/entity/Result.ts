import {
    Column, Entity,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import {Survey} from "./Survey";
import {User} from "./User";
import {Answer} from "./Answer";

@Entity()
export class Result{
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;

    @Column()
    title: string;

    @Column()
    userId: number;

    @Column()
    surveyId: number;

    @OneToMany(type => Answer, answer => answer.result, {cascade:true})
    answers: Answer[]

    @ManyToOne(type => Survey, survey => survey.results,{ onDelete: 'CASCADE' })
    survey: Survey;

    @ManyToOne(type => User, user => user.results, { onDelete: 'CASCADE' })
    user: User;
}