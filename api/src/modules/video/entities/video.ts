import {Column, Entity} from 'typeorm';
import {BaseModel} from "framework";


@Entity('videos')
export class VideoModel extends BaseModel {
    @Column('varchar')
    name!: string;
}
