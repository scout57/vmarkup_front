import {Body, EntityNotFoundException, getRepository, JsonController, Post} from "framework";
import * as fs from 'fs';
import {ImportVideoDto} from "./requests/import";
import {VideoScene} from "../../../entities/video-scene";
import {Video} from "../../../entities/video";
import {VideoSceneDetection} from "../../../entities/video-scene-detection";
import {VideoSceneEvent} from "../../../entities/video-scene-event";
import {VideoSceneFace} from "../../../entities/video-scene-face";
import {VideoSceneAudio} from "../../../entities/video-scene-audio";

type VideoSceneFrameJson = {
    detections: Array<{ class: string, confidence: number }>
    events: Array<{ class_id: string, name: string, probability: number }>
    poi: Record<'faces', Array<{ emotion: { label: string, probability: number } }>>
}
type VideoSceneJson = Record<string, Array<VideoSceneFrameJson>>;


type AudioSceneFrameJson = {
    transcriptions: Array<{ text: string }>
    summary: Array<{ summary: string }>
    sentiment_analysis: Array<{ sentiment: string, confidence: number }>
    clap_analysis: string[],
    labeled_transcriptions: string[],

}
type AudioSceneJson = Record<string, AudioSceneFrameJson>;

@JsonController("/api/v1/import")
export class ImportVideoController {
    constructor() {
    }

    @Post("/")
    public async index(@Body dto: ImportVideoDto) {
        // post-validation
        if (dto.name.match(/[^\w-_]+/gi)) {
            throw new EntityNotFoundException('folder', dto.name);
        }

        const videoId = await this.importVideo(dto.name);
        await this.importAudio(dto.name, videoId);


        return {success: true};
    }


    private async importVideo(filename: string): Promise<number> {
        // I/O operations
        const path = `./shared/${filename}/video_scenes.json`
        const exists = fs.existsSync(path);

        if (!exists) {
            throw new EntityNotFoundException('file', filename);
        }

        const file = fs.readFileSync(path);
        const json: VideoSceneJson = JSON.parse(file.toString());

        // save DB

        const video = await getRepository(Video).save({
            name: filename,
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

        return video.id;
    }

    private async importAudio(filename: string, videoId: number): Promise<void> {
        // I/O operations
        const path = `./shared/${filename}/audio_scenes.json`
        const exists = fs.existsSync(path);

        if (!exists) {
            throw new EntityNotFoundException('file', filename);
        }

        const file = fs.readFileSync(path);
        const json: AudioSceneJson = JSON.parse(file.toString());

        // save DB

        for (const key in json) {
            const id = parseInt(key.substring(6));
            if (isNaN(id)) {
                throw new Error('audio:' + key + ' is not `scene_$ID`')
            }
            const frame = json[key];

            const scene = await getRepository(VideoScene).findOneOrFail({
                where: {
                    video_id: videoId,
                    original_id: id,
                }
            })

            // video detections
            const audios: Array<Partial<VideoSceneAudio>> = [];

            audios.push({
                scene_id: scene.id,
                transcription: frame.transcriptions[0]?.text,
                summary: frame.summary[0]?.summary,
                sentiment_label: frame.sentiment_analysis[0]?.sentiment,
                sentiment_confidence: frame.sentiment_analysis[0]?.confidence,
                clap_labels: frame.clap_analysis.join(',').toLowerCase(),
                labeled_transcriptions: frame.labeled_transcriptions.join(',').toLowerCase(),
            })

            await getRepository(VideoSceneAudio).save(audios);
        }
    }
}
