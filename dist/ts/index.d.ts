import { IOption } from "./interfaces/index";
export declare class Instance {
    socketUrl: string;
    inputUrl: string;
    webSocket: WebSocket;
    pongTimer: number;
    option: IOption;
    isConnected: boolean;
    get state(): number;
    init(url: string, option: IOption): Promise<unknown>;
    eventStore: {};
    close(message: string): Promise<unknown>;
    onError: (error: any) => void;
    onConnected: () => void;
    onDisconnected: () => void;
    on(event: string, callback: (data: any) => void): void;
    emit(eventName: string, data: any): void;
    sendPing(): void;
    waitForPong(): void;
    establishWebSocketConnection(): Promise<unknown>;
    onOffline(): void;
}
