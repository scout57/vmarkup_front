import {Get, getConnection, getRepository, JsonController, Params, Query,} from "framework";
import {Video} from "../../../entities/video";
import {GetVideoListDto} from "./requests/get-list";

@JsonController("/api/v1/video")
export class VideoController {
    constructor() {
    }

    @Get("/")
    public async index(@Query dto: GetVideoListDto) {
        const videos = getRepository(Video)

        const items = await videos.find({
            take: dto.limit > 0 ? dto.limit : undefined,
            skip: dto.offset,
            // relations: ['scenes', 'scenes.detections', 'scenes.events', 'scenes.faces']
        });

        const count = await videos.count();
        return {
            meta: {
                total: count,
                limit: dto.limit,
            },
            items: items
        };
    }

    @Get("/:id")
    public async show(@Params('id') id: number) {
        const runner = getConnection().createQueryRunner();
        const detections: Array<{ id: number, class: string | null, avg: number | null }> = await runner.query(
            "select\n" +
            "\tvs.id,\n" +
            "\tvsd.\"class\",\n" +
            "\tavg(vsd.confidence)\n" +
            "from video_scenes vs \n" +
            "\tleft join video_scenes_detections vsd ON vs.id = vsd.scene_id \n" +
            "where video_id = 1\n" +
            "group by vs.id, vsd.\"class\" \n" +
            "order by vs.id, avg(vsd.confidence) desc"
        )

        const scenes: Record<number, {
            id: number,
            detections: Array<{ class: string | null, avg: number | null }>,
            events: Array<{ name: string | null, probability: number | null }>,
            faces: Array<{ emotion_label: string | null, emotion_probability: number | null }>
        }> = {}

        for (const item of detections) {
            if (scenes[item.id] === undefined) {
                scenes[item.id] = {
                    id: item.id,
                    detections: [],
                    events: [],
                    faces: [],
                }
            }

            if (scenes[item.id].detections === undefined) {
                scenes[item.id].detections = []
            }

            if (item.avg === null) {
                continue;
            }

            scenes[item.id].detections.push({
                avg: item.avg,
                class: item.class
            });
        }

        const events: Array<{ scene_id: number, name: string | null, probability: number | null }> = await runner.query(
            "select\n" +
            "\tvs.id \"scene_id\",\n" +
            "\tvse.\"name\",\n" +
            "\tmax(vse.probability) \"probability\"\n" +
            "from video_scenes vs \n" +
            "\tleft join video_scenes_events vse ON vs.id = vse.scene_id\n" +
            "where video_id = 1\n" +
            "group by vs.id, vse.\"name\" \n" +
            "order by vs.id, max(vse.probability) desc"
        )

        for (const item of events) {
            if (scenes[item.scene_id] === undefined) {
                scenes[item.scene_id] = {
                    id: item.scene_id,
                    detections: [],
                    events: [],
                    faces: [],
                }
            }

            if (item.name === null) {
                continue;
            }

            if (scenes[item.scene_id].events === undefined) {
                scenes[item.scene_id].events = []
            }

            scenes[item.scene_id].events.push({
                name: item.name,
                probability: item.probability
            });
        }

        const faces: Array<{ scene_id: number, emotion_label: string | null, emotion_probability: number | null }> = await runner.query(
            "select\n" +
            "\tvs.id \"scene_id\",\n" +
            "\tvsf.emotion_label \"emotion_label\",\n" +
            "\tmax(vsf.emotion_probability) \"emotion_probability\"\n" +
            "from video_scenes vs \n" +
            "\tleft join video_scenes_faces vsf ON vs.id = vsf.scene_id\n" +
            "where video_id = 1\n" +
            "group by vs.id, vsf.emotion_label \n" +
            "order by vs.id, max(vsf.emotion_probability) desc"
        )

        for (const item of faces) {
            if (scenes[item.scene_id] === undefined) {
                scenes[item.scene_id] = {
                    id: item.scene_id,
                    detections: [],
                    events: [],
                    faces: [],
                }
            }

            if (item.emotion_probability === null) {
                continue;
            }

            if (scenes[item.scene_id].faces === undefined) {
                scenes[item.scene_id].faces = []
            }

            scenes[item.scene_id].faces.push({
                emotion_label: item.emotion_label,
                emotion_probability: item.emotion_probability
            });
        }


        return {ok: true, scenes: Object.values(scenes)};
    }
}
