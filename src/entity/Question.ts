import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId} from "typeorm";
import {Survey} from "./Survey";
import {Answer} from "./Answer";
import {Image} from "./Image";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    title: string;

    //객관식
    @Column("simple-array", {nullable: true})
    choices: string[];

    @Column()
    surveyId: number;

    @ManyToOne(type => Survey, survey => survey.questions,{ onDelete: 'CASCADE' })
    survey: Survey;

    @OneToMany(type => Answer, answer => answer.question, {cascade:true})
    answers: Answer[];

    @OneToMany(type => Image, image => image.question, {cascade:true})
    images: Image[];

}

