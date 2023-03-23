import { Player, User } from 'MyModels';
import React, { useEffect, useState } from 'react';
import { Command } from '../components/command';
import { Equipment } from '../components/Equipment';
import { History } from '../components/history';
import { Map } from '../components/map';
import { Counter } from '../features/counter/Counter';
import { setLocation } from '../features/data/locationSlice';
import { setPlayer } from '../features/data/playerSlice';
import authService from '../services/auth.service';
import { getLocation, getPlayer } from '../services/command.service';
import tokenService from '../services/token.service';
import { useAppDispatch } from '../store/hooks';
import HomeLayout from './homeLayout';

export function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const userId = authService.getUserId();
      const player = await getPlayer(userId);
      dispatch(setPlayer(player));
      const location = await getLocation(player.location);
      dispatch(setLocation(location));
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3 sticky top-0 h-screen pt-12 pr-4">
        <Equipment />
      </div>
      <div className="col-span-6 ">
        <HomeLayout>
          <History />
          <Command />
        </HomeLayout>
      </div>
      <div className="col-span-3  sticky top-0 h-screen pt-12 pl-4">
        <Map />
      </div>
    </div>
  );
}
