import {Column, Entity,PrimaryColumn} from 'typeorm';


@Entity('videos')
export class VideoModel {

    @PrimaryColumn({
        type: 'int',
        generated: true,
        generatedIdentity: "ALWAYS"
    })
    id!: string;

    @Column('varchar')
    name!: string;
}
