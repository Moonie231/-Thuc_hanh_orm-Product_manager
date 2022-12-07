import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    price: number;

    @Column()
    public name: string;

    @Column({ type: "varchar" })
    public author: string;

    @Column({ type: "varchar" })
    public image: string;
}