import { Command, CommandRenderOptions } from '../Command';

export default class LocationCommand extends Command {
  constructor() {
    super({ name: 'location' });
  }
  render({ location }: CommandRenderOptions): string | JSX.Element {
    console.log(location);

    return (
      <div className=''>
        <p className="text-center pb-2 text-green-500">You are on {location.name}</p>
        <p className="text-center">North: {location.north}</p>
        <div className='flex justify-around py-4 text-white'>
        <div className="">West: {location.west}</div>
        <div className=""> East: {location.east}</div>
        </div>
        <p className="text-center">South: {location.south}</p>
      </div>
    );
  }
}
