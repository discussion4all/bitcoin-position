import {Column, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn} from "typeorm";


@Entity()
export class Setting {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    key: string;

    @Column()
    value: any;

    @UpdateDateColumn()
    updatedAt: Date;
}
