import { CreatePlayerDto } from "src/player/dto/createPlayerDto";
import { PlayerController } from "src/player/player.controller";
import { PlayerService } from "src/player/player.service";

export class Action {

    constructor() {

    }

    id: string
    input: string;
    isPlayerCreated: boolean
    isPlayerLogged: boolean;

    

}

