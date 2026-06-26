import { VALID_MONSTER_TYPES } from 'constants/const';

export type MonsterType = (typeof VALID_MONSTER_TYPES)[number];

export type Monster = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  type: MonsterType;
  description: string;
};

export interface MonsterData {
  products: Monster[];
}

export type User = {
  username: string;
  password: string;
  isAdmin: boolean;
};

export interface UserData {
  users: User[];
}
