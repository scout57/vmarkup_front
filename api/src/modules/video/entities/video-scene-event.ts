import {Column, Entity} from 'typeorm';
import {BaseModel} from "framework";


@Entity('video_scenes_events')
export class VideoSceneEvent extends BaseModel {
    @Column('int')
    scene_id!: number;

    @Column('varchar')
    class_id!: string;

    @Column('varchar')
    name!: string;

    @Column('float')
    probability!: number;
}
