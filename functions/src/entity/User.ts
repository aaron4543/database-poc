
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, BeforeInsert } from 'typeorm';
import { Hat } from './Hat';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    weight: number;

    @Column()
    createdAt: Date;

    @Column()
    isCool: boolean;

    @BeforeInsert()
    addTimestamp() {
        this.createdAt = new Date();
    }

    @OneToMany(type => Hat, hat => hat.owner)
    hats: Hat[];
}



