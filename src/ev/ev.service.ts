import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class EvService {
    constructor(private configService:ConfigService){}

    getDbURL(){
        return this.configService.get<string>('DATABASE_URL');
    }
}
