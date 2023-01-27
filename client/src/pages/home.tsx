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
  const [playerIsCreated, setPlayerIsCreated] = useState(false);
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
  
  const actions = {
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
    "HitPoints: "+player.hitpoints+
    ", Attack: "+player.attack+
    ", Strenght: "+player.strenght+
    ", Defense: "+player.defense+"."

  const messages = {

    playerIsCreated: "Cannot create player, already created",
    playerCreated: "Player created"
  }

  useEffect(() => {


    const authUser = localStorage.getItem('user');
    if (!authUser) {
      router.push("/auth/login");
    }
    authService.getCurrentUser().then(result => setUser(result))
    authService.getCurrentUser().then(result => getPlayerData(result))
    //getPlayerData()

  }, []);


  const getPlayerData = async (result) => {
    
    try {

      const response = await http.get(`/player/${result.id}`);
      
      setPlayer(response.data);
      setPlayerIsCreated(true);

    } catch (e) {
      console.log(e);
    }
  

  }

  const createPlayer = async () => {

    setGameLogKey(gameLog.length + 1)
    

    try {

      const response = await http.post('/player/create',{
        id: user.id
      });

      setPlayer(response.data);
      setPlayerIsCreated(true);

      setGameLog([ ...gameLog, { text: messages.playerCreated, key: key }])

    } catch (e) {
      console.log(e);
    }
  

  }

  const action = async (action: string) => {

    setGameLogKey(gameLog.length + 1)

    if (action === "create") {

      setGameLog([ ...gameLog, { text: actions.create, key: gameLogKey }])

      if (playerIsCreated === true) {
        setGameLog([ ...gameLog, { text: messages.playerIsCreated, key: gameLogKey }])
      }
      if (playerIsCreated === false) {
        createPlayer();
  
      }

    }
    if (action === "stats") {
      console.log(player)
      setGameLog([ ...gameLog, { text: stats, key: gameLogKey }])

    }
    if (action === "attack") {
      setGameLog([ ...gameLog, { text: actions.attack, key: gameLogKey }])

    }


  }

  const gameLogs = gameLog.map((log) => (
    <li key={log.key} className="text-white pb-1">
    {log.text}
    </li>
  ));

    return (
      <>
        <main className="bg-darker h-screen justify-center items-center py-20">
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