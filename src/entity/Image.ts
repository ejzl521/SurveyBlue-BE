import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Question} from "./Question";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, nullable: true})
    mimetype: string;

    @Column({type: "longblob"})
    data: string;

    @Column({length: 100, nullable: true})
    original_name : string;

    @Column({nullable: true})
    questionId: number;

    @ManyToOne(type => Question, question => question.images,{ onDelete: 'CASCADE' })
    question: Question;

}