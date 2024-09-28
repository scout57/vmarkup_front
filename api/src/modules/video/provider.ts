import {interfaces} from "inversify";
import {IProvider, ITypeormModule} from "framework";
import {HttpController} from "./http/v1/controller";
import {VideoModel} from "./entities/video";

export class VideoModule implements IProvider, ITypeormModule {

    constructor(protected readonly container: interfaces.Container) {
    }

    getTypeormEntities(): Function[] {
        return [VideoModel];
    }

    getExpressControllers(): Function[] {
        return [HttpController];
    }

    async boot(): Promise<void> {
    }

    async register(): Promise<void> {
        const httpController = new HttpController();
        this.container.bind(HttpController).toConstantValue(httpController);
    }

}
