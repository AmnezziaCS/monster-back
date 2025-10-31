import { Injectable } from '@nestjs/common';
import { Monster, MonsterType, MonsterData } from './types/globalTypes';
import rawData from '../data/monsters.json';
import { GetMonstersQueryDto } from 'dto/get-monsters-query.dto';

const data: MonsterData = rawData as MonsterData;

@Injectable()
export class MonsterService {
  getAllMonsters(query?: GetMonstersQueryDto): Monster[] {
    let monsters = data.products;

    if (query?.type) {
      monsters = monsters.filter((m) => m.type === query.type);
    }

    if (query?.name) {
      const nameLower = query.name.toLowerCase();
      monsters = monsters.filter((m) =>
        m.name.toLowerCase().includes(nameLower),
      );
    }

    if (query?.minPrice !== undefined) {
      monsters = monsters.filter((m) => m.price >= query.minPrice);
    }

    return monsters;
  }

  getMonsterById(id: number): Monster | undefined {
    return data.products.find((monster) => monster.id === id);
  }

  getAllMonstersFromType(type: MonsterType): Monster[] {
    return data.products.filter((monster) => monster.type === type);
  }
}
