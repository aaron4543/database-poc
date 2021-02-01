import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { User } from './User'

@Entity()
export class Hat extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    color: string;

    @ManyToOne(type => User, user => user.hats)
    owner: User;
}