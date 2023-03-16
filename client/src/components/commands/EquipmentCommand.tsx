import React from 'react';
import { Props } from 'MyModels';

export function EquipmentCommand(props: Props) {
  const player = props.props?.player;
  if (player) {
    return (
      <div className="text-white">
        <p>
          Weapon: {player.weapon}, Shield: {player.shield};
        </p>
        <p>
          Head: {player.head}, Chest: {player.chest}, Legs: {player.legs}, Feet:{' '}
          {player.feet}, Hands: {player.hands}, Head: {player.head};
        </p>
        <p>
          Neck: {player.neck}, Ring: {player.ring};
        </p>
      </div>
    );
  } else {
    return <div></div>;
  }
}
