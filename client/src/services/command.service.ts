import { AxiosError } from 'axios';
import { Drop, Inventory } from 'MyModels';
import http from './http';

// export const logout = async (user) => {
//   try {
//     const { data } = await http.get(`player/${user}`)

//     return data
//   } catch (error) {
//     console.log(error)
//   }
// }

export const getCommandList = () => {
  return [
    'attack',
    'location',
    'move',
    'help',
    'loot',
    'inventory',
    'stats',
    'equipment',
    'equip'
  ];
};

export const commandList = {
  attack: 'attack',
  help: 'help',
  location: 'location',
  move: 'move'
};

export const sleep = async (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const getPlayer = async (id: string) => {
  try {
    const { data } = await http.get(`player/${id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getLocation = async (location: string) => {
  try {
    const { data } = await http.get(`location/${location}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postLocation = async (id: string, location: string) => {
  try {
    const { data } = await http.post(`player/move`, {
      id: id,
      location: location
    });
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const getPlayerData = async (user) => {
//   try {
//     const { data } = await http.get(`player/${user.id}`)

//     console.log(data)
//     return data
//   } catch (error) {
//     console.log(error)
//   }
// }

export const getFight = async (playerId: string, monsterName: string) => {
  try {
    const { data } = await http.post(`fight/fightstart`, {
      playerId: playerId,
      monsterName: monsterName
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postFight = async (fight: any) => {
  try {
    const { data } = await http.post(`fight/attack`, {
      player: fight.player,
      monster: fight.monster,
      username: fight.username,
      playerHit: fight.playerHit,
      monsterHit: fight.monsterHit
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getLoot = async (id: string, drop: Drop[]) => {
  try {
    const { data } = await http.post(`inventory/lootall`, {
      id: id,
      drop: drop
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getInventory = async (
  id: string
): Promise<Inventory[] | undefined> => {
  try {
    const { data } = await http.get(`inventory/${id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postEquipment = async (
  playerId: string,
  equipmentName: string
) => {
  try {
    const { data } = await http.post(`player/equip`, {
      playerId: playerId,
      equipmentName: equipmentName
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
