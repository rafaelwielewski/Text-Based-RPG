import { postLocation } from "@/api";
import { DataProvider } from "@/utils/dataProvider";
import { Command, CommandRenderOptions } from "../Command";

export default class MoveCommand extends Command {
  constructor() {
    super({ name: "move" });
  }


  async render({ user, player, location, args }: CommandRenderOptions): JSX.Element | render | string | { render: JSX.Element | string, data: any} {

    let locationName;
    console.log(location)
    switch (args[1]) {
      case 'north':
        locationName = location.north
        break;
      case 'south':
        locationName = location.south
        break;
      case 'west':
        locationName = location.west
        break;
      case 'east':
        locationName = location.east
        break;
  
      default:
        return { render: <p>Use command 'move' with a direction.</p>, data:'' };
    }

    if (locationName === 'Nothing' || locationName === null) {

      return { render: <p>You can't go there.</p>, data:'' };
  
    }else {

      location = await postLocation(player.id, locationName).then(result => {
        return result
      })

      const render = <div><p className="text-center">You are on {location.name}</p>
      <p className="text-center">North: {location.north}</p>
      <span className="text-left">West: {location.west}</span><span className="text-right">                                          East: {location.east}</span>
      <p className="text-center">South: {location.south}</p>
      </div>;

      return { render: render, data: location }
    }

  }
  // render({ location }: CommandRenderOptions) {

  //   console.log(location)
  //   return 
  // }
}
