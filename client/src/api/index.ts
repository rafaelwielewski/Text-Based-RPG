import http from "@/lib/services/http";
import { PlayerService } from "@/utils/playerService";


export const getProjects = async () => {
  const { data } = await http.get(
    `https://api.github.com/users/${config.social.github}/repos`,
  );

  return data;
};

export const getWeather = async (city: string) => {
  const { data } = await http.get(`https://wttr.in/${city}?ATm`);

  return data;
};

export const getQuote = async () => {
  const { data } = await http.get('https://api.quotable.io/random');

  return {
    quote: `“${data.content}” — ${data.author}`,
  };


};
export const logout = async (user) => {
  try {
  const { data } = await http.get(
    `player/${user}`,
  );

  return data;

} catch (error) {
  console.log(error);
}
};

export const getPlayer = async (id) => {
  try{
  const { data } = await http.get(
    `player/${id}`,
  );

  return data;

} catch (error) {
  console.log(error);
}
};

export const getLocation = async (player) => {
  try {
  const { data } = await http.get(
    `location/${player.location}`,
  );
    
  return data;

} catch (error) {
  console.log(error);
}
};

export const postLocation = async (id, location) => {

  try {
  const { data } = await http.post(
    `player/move`,{
      id: id,
      location: location
    }
    
  );
  console.log(data)

  return data;

} catch (error) {
  console.log(error);
}

};


export const getPlayerData = async (user) => {

  try {

  const { data } = await http.get(
    `player/${user.id}`,
  );

  console.log(data)
  return data;

  } catch (error) {
    console.log(error);
}

};

export const fightStart = async (playerId, monsterName) => {
  try{
  const { data } = await http.post(
    `fight/fightstart`,{
      playerId: playerId,
      monsterName: monsterName
    }
  );

  return data;
} catch (error) {
  console.log(error);
}
};

export const attackApi = async (fight) => {
  try{
    console.log(fight)
  const { data } = await http.post(
    `fight/attack`,{
      player: fight.player,
      monster: fight.monster,
      username: fight.username,
      playerHit: fight.playerHit,
      monsterHit: fight.monsterHit
    }
  );

  return data;
} catch (error) {
  console.log(error);
}
};

