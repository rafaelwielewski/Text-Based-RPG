declare module 'MyModels' {
  // export interface User {
  //   id: string;
  //   username: string;
  //   email: string;
  //   password: string;
  //   refreshToken: string;
  // }

  export interface Player {
    id: string;
    location: string;
    training: string;
    combatLvl: number;
    hitpointsLvl: number;
    attackLvl: number;
    strenghtLvl: number;
    defenceLvl: number;
    hitpointsXP: number;
    attackXP: number;
    strenghtXP: number;
    defenceXP: number;
    hitpointsMax: number;
    hitpoints: number;
    attackBonus: number;
    strenghtBonus: number;
    defenceBonus: number;
    weapon: string;
    chest: string;
    legs: string;
    head: string;
    shield: string;
    hands: string;
    feet: string;
    neck: string;
    ring: string;
  }

  export interface Location {
    id: number;
    name: string;
    north: string;
    east: string;
    south: string;
    west: string;
    action: string;
    monsterName: string;
    shopName: string;
  }

  export interface Drop {
    drop: string;
    quantity: number;
  }
}
