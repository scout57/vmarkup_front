import {App, IProvider} from "framework";

export class StartApp extends App {

    override useVault(): boolean {
        return false;
    }

    getName(): string {
        return "stark-api-app";
    }

    public getProviders(): IProvider[] {
        return [];
    }
}
