import {Body, EntityNotFoundException, getRepository, JsonController, Post} from "framework";
import * as fs from 'fs';
import {ImportVideoDto} from "./requests/import";
import {VideoScene} from "../../../entities/video-scene";
import {Video} from "../../../entities/video";
import {VideoSceneDetection} from "../../../entities/video-scene-detection";
import {VideoSceneEvent} from "../../../entities/video-scene-event";
import {VideoSceneFace} from "../../../entities/video-scene-face";

type SceneFrameJson = {
    detections: Array<{ class: string, confidence: number }>
    events: Array<{ class_id: string, name: string, probability: number }>
    poi: Record<'faces', Array<{ emotion: { label: string, probability: number } }>>
}
type SceneJson = Record<string, Array<SceneFrameJson>>;

@JsonController("/api/v1/video/import")
export class ImportVideoController {
    constructor() {
    }

    @Post("/")
    public async index(@Body dto: ImportVideoDto) {
        // post-validation
        if (dto.name.match(/[^\w-_]+/gi)) {
            throw new EntityNotFoundException('folder', dto.name);
        }

        // I/O operations
        const path = `./shared/${dto.name}/video_scenes.json`
        const exists = fs.existsSync(path);

        if (!exists) {
            throw new EntityNotFoundException('file', dto.name);
        }

        const file = fs.readFileSync(path);
        const json: SceneJson = JSON.parse(file.toString());

        // save DB

        const video = await getRepository(Video).save({
            name: dto.name,
        })

        for (const key in json) {
            const id = parseInt(key.substring(6));
            if (isNaN(id)) {
                throw new Error(key + ' is not `scene_$ID`')
            }


            const scene = await getRepository(VideoScene).save({
                video_id: video.id,
                original_id: id,
            })

            // video detections
            const detections: Array<Partial<VideoSceneDetection>> = [];
            const events: Array<Partial<VideoSceneEvent>> = [];
            const faces: Array<Partial<VideoSceneFace>> = [];

            for (const frame of json[key]) {
                for (const detect of frame.detections) {
                    detections.push({
                        class: detect.class,
                        confidence: detect.confidence,
                        scene_id: scene.id
                    })
                }

                for (const event of frame.events) {
                    events.push({
                        class_id: event.class_id,
                        name: event.name,
                        probability: event.probability,
                        scene_id: scene.id
                    })
                }

                for (const face of frame.poi.faces) {
                    faces.push({
                        emotion_label: face.emotion.label,
                        emotion_probability: face.emotion.probability,
                        scene_id: scene.id
                    })
                }
            }

            await getRepository(VideoSceneDetection).save(detections);
            await getRepository(VideoSceneEvent).save(events);
            await getRepository(VideoSceneFace).save(faces);
        }

        return {success: true};
    }

}
