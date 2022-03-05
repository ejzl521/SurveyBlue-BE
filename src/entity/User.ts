import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany, OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from "typeorm";
import {Role} from "./Role";
import {Survey} from "./Survey";
import {Result} from "./Result";

@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;

    @Column({length: 255})
    email: string;

    @Column({length: 255})
    password: string;

    @Column({length: 255})
    username: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @ManyToMany(() => Role, role => role.users, {onDelete: 'CASCADE'})
    @JoinTable({
        name: "user_role",
        joinColumn: {name: "user_id", referencedColumnName: "id"},
        inverseJoinColumn: {name: "role_id", referencedColumnName: "id"}
    })
    roles: Role[];

    @OneToMany(type => Survey, survey => survey.user, {cascade:true})
    surveys: Survey[];

    @OneToMany(type => Result, result => result.user, {cascade:true})
    results: Result[];
}