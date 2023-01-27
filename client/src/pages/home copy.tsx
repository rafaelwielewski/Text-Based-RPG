import ActionInput from "@/components/actionInput";
import authService from "@/lib/services/auth/auth.service";
import { GameLog } from "@/lib/types/gameLog";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";


export default function Home() {

  const router = useRouter();
  const [gameLog, setGameLog] = useState<GameLog[]>([]);
  

  useEffect(() => {
    
    const authUser = localStorage.getItem('user');
    if (!authUser) {
      router.push("/auth/login");
    }
  }, []);


  // function decodeJwt(token) {
  //   var base64Payload = token.split(".")[1];
  //   var payloadBuffer = Buffer.from(base64Payload, "base64");
  //   return JSON.parse(payloadBuffer.toString());

  //   const user = JSON.parse(localStorage.getItem('user'));
  //   const decodedJwt = decodeJwt(user.accessToken);
  //   console.log(decodedJwt.username);
  //   console.log(user.username);
  // }

  const action = async (action: string) => {

    console.log(gameLog)
    const key = gameLog.length + 1;
    setGameLog([ ...gameLog, { text: action, key: key }])
    console.log(gameLog)

  }

  const gameLogs = gameLog.map((log) => (
    <li key={log.key} className="flex col-span-12 text-white">
    {log.text}
    </li>
  ));

    return (
      <>
        <main className="bg-darker flex h-screen justify-center items-center">
          <div className="bg-dark w-3/4 flex grid grid-cols-12">
          {/* <textarea className="flex col-span-12" 
          name="" id="" 
          cols={110} rows={15} 
          value={gameLog}
          ></textarea> */}
          <div className="col-span-12 max-h-md divide-y divide-white text-white overflow-y-scroll">
          <ul>{gameLogs}</ul>
          </div>
          <ActionInput action={action}/>
          </div>
          
        </main>
      </>
    )
  }