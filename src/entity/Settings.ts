import {Entity, ObjectID, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Settings {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    price: number = 100;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor() {
       
    }
}
