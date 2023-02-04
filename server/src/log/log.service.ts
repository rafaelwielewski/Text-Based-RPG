import { Injectable } from '@nestjs/common';
import { logDto } from './dto/logDto';
import { Log } from './entity/log.entity';

@Injectable()
export class LogService {
    constructor(
    //private playerService: logService
  ) {}

  private log: Log;

  public setLog(logDto: logDto) {

    return this.log = logDto

  }

  public getLog() {

    return this.log

  }

}
