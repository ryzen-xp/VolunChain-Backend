import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TestItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    value: number;

    @Column()
    age: number;
}