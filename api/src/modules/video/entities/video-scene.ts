import {Column, Entity} from 'typeorm';
import {BaseModel} from "framework";


@Entity('video_scenes')
export class VideoScene extends BaseModel {
    @Column('int')
    video_id!: number;

    @Column('int')
    original_id!: number;
}
