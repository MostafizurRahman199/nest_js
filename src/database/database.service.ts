import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
    private isConnected: boolean = false;

    onModuleInit() {
        this.isConnected = true;
        console.log(`Database connected: ${this.isConnected}`)
    }
    onApplicationShutdown(signal: string) {
        this.isConnected = false;
        console.log(`Database disconnected: ${this.isConnected}, Signal :${signal}`)
    }
    getStatus(): string {
        return this.isConnected ? 'Connected' : 'Disconnected';
    }


}
