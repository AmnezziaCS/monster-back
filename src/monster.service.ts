import { Injectable } from '@nestjs/common';
import { Monster, MonsterType, MonsterData } from './types/globalTypes';
import rawData from '../data/monsters.json';

const data: MonsterData = rawData as MonsterData;

@Injectable()
export class MonsterService {
  getAllMonsters(): Monster[] {
    return data.products;
  }

  getMonsterById(id: number): Monster | undefined {
    return data.products.find((monster) => monster.id === id);
  }

  getMonstersByType(type: MonsterType): Monster[] {
    return data.products.filter((monster) => monster.type === type);
  }
}
