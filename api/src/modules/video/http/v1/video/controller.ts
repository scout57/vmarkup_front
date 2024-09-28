import {Get, getRepository, JsonController, Params, Query,} from "framework";
import {Video} from "../../../entities/video";
import {GetVideoListDto} from "./requests/get-list";

@JsonController("/api/v1/video")
export class VideoController {
    constructor() {
    }

    @Get("/")
    public async index(@Query dto: GetVideoListDto) {
        const videos = getRepository(Video);
        const items = await videos.find({
            take: dto.limit > 0 ? dto.limit : undefined,
            skip: dto.offset
        });

        const count = await videos.count();
        return {
            meta: {
                total: count,
                limit: dto.limit,
            },
            items
        };
    }

    @Get("/:id")
    public async show(@Params('id') id: number) {
        return {ok: true, id};
    }
}
