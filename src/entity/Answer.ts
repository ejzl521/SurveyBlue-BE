import {
    Column,
    Entity, ManyToOne,
    PrimaryGeneratedColumn,

} from "typeorm";
import {Question} from "./Question";
import {Result} from "./Result";


@Entity()
export class Answer{
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;

    @Column()
    type: string;

    @Column()
    title: string;

    @Column()
    answer: string;

    @ManyToOne(type=>Question, question => question.answers ,{ onDelete: 'CASCADE' })
    question: Question;

    @ManyToOne(type => Result, result => result.answers, { onDelete: 'CASCADE' })
    result: Result;
}