import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';

@Module({
    providers: [LogService],
    controllers: [LogController],
    exports: [LogService],
})
export class LogModule {}
