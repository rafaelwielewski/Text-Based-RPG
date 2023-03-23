import React from 'react';
import { Props } from 'MyModels';
import { useAppSelector } from '../store/hooks';
import { selectPlayer } from '../features/data/playerSlice';

export function Equipment() {
  const player = useAppSelector(selectPlayer);
  if (player) {
    return (
      <div className="text-white text-center">
        <p>
          Head: <p>{player.head}</p>
        </p>
        <p className="pt-4">
          Neck: <p>{player.neck}</p>
        </p>
        <p className="grid grid-cols-3 pt-4">
          <div className="col-span-1">
            Weapon: <p>{player.weapon}</p>
          </div>
          <div className="col-span-1">
            Chest: <p>{player.chest}</p>
          </div>
          <div className="col-span-1">
            Shield: <p>{player.shield}</p>
          </div>
        </p>
        <p className="pt-4">
          Legs: <p>{player.legs}</p>
        </p>
        <p className="grid grid-cols-3 pt-4">
          <div className="col-span-1">
            Hands: <p>{player.hands}</p>
          </div>
          <div className="col-span-1">
            feet: <p>{player.feet}</p>
          </div>
          <div className="col-span-1">
            ring: <p>{player.ring}</p>
          </div>
        </p>
      </div>
    );
  } else {
    return <div></div>;
  }
}
