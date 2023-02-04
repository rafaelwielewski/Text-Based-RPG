
import { getLocation, postLocation } from '../../api';
import { PlayerService } from '../playerService';


export const move = async (args: string[], player, location, callback? ) => {

  let locationName;

  if (args[0] === 'north') {
    console.log(location.north)

      locationName = location.north
  }

  if (args[0] === 'south') {
    locationName = location.south
  }

  if (args[0] === 'west') {
    locationName = location.west
  }

  if (args[0] === 'east') {
    locationName = location.east
  }

  const moved = await postLocation(player.id, locationName);
  console.log(moved)
  return callback(moved)

};
