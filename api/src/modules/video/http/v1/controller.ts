import {Get, JsonController, Params,} from "framework";

@JsonController("/api/v1/video")
export class HttpController {
    constructor() {
    }

    @Get("/")
    public async index() {
        return {ok: true};
    }

    @Get("/:id")
    public async show(@Params('id') id: number) {
        return {ok: true, id};
    }
}
