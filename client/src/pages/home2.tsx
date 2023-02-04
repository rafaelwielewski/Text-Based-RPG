import ActionInput from "@/components/actionInput";
import authService from "@/lib/services/auth/auth.service";
import http from "@/lib/services/http";
import { GameLog } from "@/lib/types/gameLog";
import { useRouter } from "next/router";
import AuthVerify from "@/lib/common/auth-verify";
import React, { useEffect, useRef, useState } from "react";
import { useCommands } from "@/hooks/useCommands";
import { loadCommands } from "@/lib/Command";
import { Input } from "@/components/input";


export default function Home2() {

  const containerRef = React.useRef<HTMLDivElement>(null);
  const commands = useCommands();

  const _loadCommands = React.useCallback(async () => {
    commands.state.setCommandMap(await loadCommands());
  }, []); // eslint-disable-line

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
      _loadCommands();

    }


  }, [_loadCommands]);

  

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
      <div className="bg-darkest text-white">
      <div ref={containerRef} className="p-12">
      {commands.state.entries.map((entry, idx) => {
        const commandEntry = entry.command !== null ? entry : null;
        const showInputField = typeof entry.command !== "undefined" || !entry.output;

        return (
          <div key={idx} data-status={commandEntry?.status} data-entry={idx}>
            {showInputField ? (
              <Input
                entry={commandEntry}
                handleNewCommand={(command) => commands.handleNewCommand(command, idx)}
              />
            ) : null}

            <div
              style={{ lineHeight: "normal" }}
              className="ml-11 whitespace-pre-wrap"
              data-output={idx}
            >
              {entry.output}
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
 
  }