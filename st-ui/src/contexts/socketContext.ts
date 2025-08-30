import * as signalR from "@microsoft/signalr";

class SocketContext {
    public apiUrl: string;
    private domainUrl: string = "http://localhost:5051";
    private connection: signalR.HubConnection;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
        this.connection = this.getConnection();
    }

    public stopConnection(): Promise<void> {
        if (this.connection.state === signalR.HubConnectionState.Connected) {
            return this.connection.stop();
        }

        return Promise.resolve();
    }

    public async sendMessage<T>(methodName: string, message: T): Promise<void> {
        await this.ensureConnectionIsOpen();
        return this.connection.invoke(methodName, message);
    }

    public async listenTo<T>(methodName: string, callback: (message: T) => void) {
        await this.ensureConnectionIsOpen();
        this.connection.off(methodName);
        this.connection.on(methodName, callback);
    }

    private getConnection() {
        return new signalR.HubConnectionBuilder()
            .withUrl(`${this.domainUrl}${this.apiUrl}`)
            .withAutomaticReconnect()
            .build();
    }

    private ensureConnectionIsOpen(): Promise<void> {
        if (this.connection.state === signalR.HubConnectionState.Disconnected) {
            return this.connection.start();
        }

        return Promise.resolve();
    }
}

export default SocketContext;