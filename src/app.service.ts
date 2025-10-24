import { Injectable } from '@nestjs/common';
import { Monster } from './types/globalTypes';
import data from '../data/monsters.json';

@Injectable()
export class AppService {
  getAllMonsters(): Monster[] {
    return data.products;
  }

  getMonsterById(id: number): Monster | undefined {
    return data.products.find((monster) => monster.id === id);
  }
}
