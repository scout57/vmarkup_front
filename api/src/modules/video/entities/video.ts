import {Column, Entity} from 'typeorm';
import {BaseModel} from "framework";


@Entity('videos')
export class Video extends BaseModel {
    @Column('int')
    name!: string;
}
