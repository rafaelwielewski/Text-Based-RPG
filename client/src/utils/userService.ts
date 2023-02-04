import { Player } from "@/types/player"

export class UserService {

    private user;

    public setPlayer(user: User) {
        
        this.user = user
    }

    public getUser() {
        
        return this.user
    }

}
