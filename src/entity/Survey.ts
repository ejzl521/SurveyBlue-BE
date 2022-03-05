import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Question} from "./Question";
import {User} from "./User";
import {Result} from "./Result";

@Entity()
export class Survey {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @Column()
    userId: string;

    @OneToMany (type => Question, question => question.survey, {cascade:true})
    questions: Question[];

    @ManyToOne(type => User, user => user.surveys, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(type => Result, result => result.user, {cascade:true})
    results: Result[];
}

