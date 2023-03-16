import React from 'react';
import { Props } from 'MyModels';

export function StatsCommand(props: Props) {
  const player = props.props?.player;
  if (player) {
    return (
      <div className="text-white">
        <p>HP: {player.hitpoints};</p>
        <p>
          Combat Level: {player.combatLvl} Attack Level: {player.attackLvl},
          Strenght Level: {player.strenghtLvl}, Defense Level:{' '}
          {player.defenceLvl}, Hitpoints Level: {player.hitpointsLvl};
        </p>
        <p>
          Attack XP: {player.attackXP}, Strenght XP: {player.strenghtXP},
          Defense XP: {player.defenceXP}, Hitpoints XP: {player.hitpointsXP};
        </p>
      </div>
    );
  } else {
    return <div></div>;
  }
}
