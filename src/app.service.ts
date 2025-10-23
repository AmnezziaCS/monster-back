import { Injectable } from '@nestjs/common';
import { Monster } from './types/types';
import data from '../data/monsters.json';

@Injectable()
export class AppService {
  getAllMonsters(): Monster[] {
    console.log(data);
    return data.products.map((monster) => ({
      id: monster.id,
      name: monster.name,
      price: monster.price,
      type: monster.type,
      description: monster.description,
      imageUrl: monster.imageUrl,
    }));
  }
}
