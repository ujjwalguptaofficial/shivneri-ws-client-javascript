import { IOption } from "./interfaces/index";
export declare class Instance {
    socketUrl: string;
    inputUrl: string;
    webSocket: WebSocket;
    pongTimer: number;
    option: IOption;
    isConnected: boolean;
    constructor(url: string);
    init(option: IOption): Promise<unknown>;
    eventStore: {};
    close(): void;
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
