import { Player } from "@/types/player"

export class PlayerService {
    
    constructor() {
        this.player
      }

    private player;

    public setPlayer(player) {
        
        return this.player = player
    }

    public getPlayer() {
        console.log(this.player)
        return this.player
    }

}
