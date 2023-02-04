import { getLocation } from '../../api';
import { PlayerService } from '../playerService';

export const location = async (args: string[], location) => {
 
  console.log(location)
 
  return `
You are on ${location.name} <br>
                    North: ${location.north}<br>
West: ${location.west}                                  East: ${location.east}<br>
                    South: ${location.south}
  `;
};
