import {interfaces} from "inversify";
import {IExpressModule, IProvider, ITypeormModule} from "framework";
import {VideoController} from "./http/v1/video/controller";
import {Video} from "./entities/video";
import {VideoScene} from "./entities/video-scene";
import {VideoSceneDetection} from "./entities/video-scene-detection";
import {VideoSceneEvent} from "./entities/video-scene-event";
import {VideoSceneFace} from "./entities/video-scene-face";
import {ImportVideoController} from "./http/v1/import/controller";

export class VideoModule implements IProvider, ITypeormModule, IExpressModule {

    constructor(protected readonly container: interfaces.Container) {
    }

    getTypeormEntities(): Function[] {
        return [Video, VideoScene, VideoSceneDetection, VideoSceneEvent, VideoSceneFace];
    }

    getExpressControllers(): Function[] {
        return [VideoController, ImportVideoController];
    }

    async boot(): Promise<void> {
    }

    async register(): Promise<void> {
        const importController = new ImportVideoController();
        this.container.bind(ImportVideoController).toConstantValue(importController);

        const videoController = new VideoController();
        this.container.bind(VideoController).toConstantValue(videoController);
    }

}
