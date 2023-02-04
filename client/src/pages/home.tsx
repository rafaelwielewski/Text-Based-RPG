import ActionInput from "@/components/actionInput";
import authService from "@/lib/services/auth/auth.service";
import http from "@/lib/services/http";
import { GameLog } from "@/lib/types/gameLog";
import { useRouter } from "next/router";
import AuthVerify from "@/lib/common/auth-verify";
import React, { useEffect, useRef, useState } from "react";


export default function Home() {

  const router = useRouter();
  const [user, setUser] = useState({
    id: '',
    username: '',
    iat: '',
    exp: '',
  });
  const [gameLog, setGameLog] = useState<GameLog[]>([]);
  const [gameLogKey, setGameLogKey] = useState(0);
  const [player, setPlayer] = useState({
    hitpointsxp: NaN,
    attackxp: NaN,
    strenghtxp: NaN,
    defensexp: NaN,
    hitpoints: NaN,
    attack: NaN,
    strenght: NaN,
    defense: NaN,
    weapon: '',
    armour: '',
  });
  const [location, setLocation] = useState({})  
  const actions = {
    login: "Login",
    playernotfound: `Player not found, please write "create", to create your player.`,
    create: "Create",
    attack: "Attack",
    run: "Run",
    move: "Move",
    loot: "loot",
  }
  const stats2 = {
    hitpoints: "HitPoints: "+player.hitpoints,
    attack: "Attack: "+player.attack,
    strenght: "Strenght: "+player.strenght,
    defense: "Defense: "+player.defense,

  }

  const stats = 
    "Your Stats: " +
    "HitPoints: "+player.hitpoints+
    "; Attack: "+player.attack+
    "; Strenght: "+player.strenght+
    "; Defense: "+player.defense+"."

  const xp = 
    "Your Experiences: " +
    "HitPoints: "+player.hitpointsxp+
    "; Attack: "+player.attackxp+
    "; Strenght: "+player.strenghtxp+
    "; Defense: "+player.defensexp+"."

    const equipments = 
    "Your Equipments: " +
    "Weapon: "+player.weapon+
    "; Armour: "+player.armour+"."

  const history = {

    playerIsCreated: "Cannot create player, already created.",
    playerCreated: "Player created."
  }

  const messages = {

    welcome: "Welcome to Written Kingdom.",
    welcome2: `Write "login" to start or "create" if you don't have a player.`,
    login: "Welcome " + user.username + ".",
    playerIsCreated: "Cannot create player, already created.",
    playerCreated: "Player created.",
    playernotfound: `Player not found, write "create" to create your player.`,
    playerIsLogged: "Player already logged in."
  }

  useEffect(() => {


    const authUser = localStorage.getItem('user');
    console.log(authUser)
    if (!authUser) {
      router.push("/auth/login");
      
    } else {

      authService.getCurrentUser().then(result => setUser(result))
      authService.getCurrentUser().then(result => getPlayerData(result))
      welcome();

    }


  }, []);


  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const welcome = async () => {

    let key = gameLogKey;
    let log = gameLog;

    log = [ ...log, { text: messages.welcome, key: key++ }];
    log = [ ...log, { text: messages.welcome2, key: key++ }];

    setGameLog(log);
    setGameLogKey(key)

  }

  const getPlayerData = async (result) => {
    
    let player;

    //Player data
    try {

      const response = await http.get(`/player/${result.id}`);

      if (response.data !== '') {

        setPlayer(response.data);
        player = response.data

      }

    } catch (e) {
      console.log(e);
    }

    // location data

    try {

      const response = await http.get(`/location/${player.location}`);

      if (response.data !== '') {
        console.log(response.data)
        setLocation(response.data);

      }

    } catch (e) {
      console.log(e);
    }
  

  }

  const action = async (action: string) => {

    let key = gameLogKey;
    let log = gameLog;

    if (
      action === 'stats' ||
      action === 'attack' ||
      action === 'test'
      ) {

      gameAction(action)
      
    }


  }

  const gameAction = async (action) => {
    

  }
  
  const logout = async (e) => {

    e.preventDefault();
    console.log('klçjçl')
    try {

      const response = await http.get(`/auth/logout`);


    } catch (e) {
      console.log(e);
    }

    authService.logout();
  }

  const gameLogs = gameLog.map((log) => (
    <li key={log.key} className="text-white pb-1">
    {log.text}
    </li>
  ));


    return (
      <>
        <main className="bg-darker h-screen justify-center items-center py-20">
          <button className="bg-danger text-white py-4 px-2" type="button" onClick={logout} >Logout</button>
          <div className="bg-dark flex flex-col container">
          <div className="bg-black h-128 w-full flex text-white overflow-y-scroll break-words">
          <ul>{gameLogs}</ul>
          </div>
          <ActionInput action={action}/>
          </div>
          
        </main>
      </>
    )
  }