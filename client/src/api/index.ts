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

export const getPlayer = async (id) => {
  const { data } = await http.get(
    `player/${id}`,
  );

  return data;
};

export const getLocation = async (player) => {
  const { data } = await http.get(
    `location/${player.location}`,
  );
    
  return data;
};

export const postLocation = async (id, location) => {
  const { data } = await http.post(
    `player/move`,{
      id: id,
      location: location
    }
  );

  return data;
};


export const getPlayerData = async (user) => {
  const { data } = await http.get(
    `player/${user.id}`,
  );

  console.log(data)

  return data;
};

