import { getLocation, getPlayerData } from "@/api";
import authService from "@/lib/services/auth/auth.service";
import React, { useEffect, useState } from "react";

export interface DataContextType {
    user;
    player;
    location;
    setLocation(output);

  }
  
  const DataContext = React.createContext<DataContextType>(null);
  
  interface Props {
    children: React.ReactNode;
  }
  
  export const useData = () => React.useContext(DataContext);
  
  export const DataProvider: React.FC<Props> = ({ children }) => {

    const [user, setUser] = useState({});
    const [player, setPlayer] = useState({});
    const [location, _setLocation] = useState({})  
    
    useEffect(() => {
        // console.log(localStorage.getItem('user'))
        // const userData = getCurrentUser()
        // console.log(userData)
        console.log('usedata')
        const authUser = localStorage.getItem('user');

        if (authUser) {

            authService.getCurrentUser().then((userData) => {
                setUser(userData);

                getPlayerData(userData).then((playerData) => {
                  
                  setPlayer(playerData) 
                  getLocation(playerData).then((locationData) => setLocation(locationData))
                
                });

            })
        }

      }, []);


      const setLocation = (output) => {
        console.log(output)
        _setLocation(output);


      };

    return (
      <DataContext.Provider
        value={{
          user,
          player,
          location,
          setLocation,
        }}
      >
        {children}
      </DataContext.Provider>
    );
  };