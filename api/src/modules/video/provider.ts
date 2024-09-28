import {interfaces} from "inversify";
import {IProvider} from "framework";
import {HttpController} from "./http/v1/controller";

export class VideoModule implements IProvider {

    constructor(protected readonly container: interfaces.Container) {
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
