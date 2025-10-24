export interface MonsterData {
  products: Monster[];
}

export type Monster = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  type: MonsterType;
  description: string;
};

export const VALID_MONSTER_TYPES = [
  'Energy',
  'Ultra',
  'Java',
  'Punch',
  'Rehab',
  'MAXX',
  'X-Presso',
  'Dragon Tea',
  'Espresso',
  'Muscle',
  'Hydro',
] as const;

export type MonsterType = (typeof VALID_MONSTER_TYPES)[number];

export function isMonsterType(type: any): type is MonsterType {
  return VALID_MONSTER_TYPES.includes(type);
}
