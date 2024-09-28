import {Column, Entity} from 'typeorm';
import {BaseModel} from "framework";


@Entity('video_scenes_detections')
export class VideoSceneDetection extends BaseModel {
    @Column('int')
    scene_id!: number;

    @Column('varchar')
    class!: string;

    @Column('float')
    confidence!: number;
}
