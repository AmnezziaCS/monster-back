import { Injectable } from '@nestjs/common';
import { Monster, MonsterType } from './types/types';
import { Monster as PrismaMonster } from '@prisma/client';
import { GetMonstersQueryDto } from 'dto/get-monsters-query.dto';
import { PrismaService } from './prisma.service';

@Injectable()
export class MonsterService {
  constructor(private prisma: PrismaService) {}

  private transformPrismaMonster(prismaMonster: PrismaMonster): Monster {
    return {
      id: prismaMonster.id,
      name: prismaMonster.name,
      type: prismaMonster.type as MonsterType,
      description: prismaMonster.description,
      price: prismaMonster.price,
      imageUrl: prismaMonster.imageUrl,
    };
  }

  async getAllMonsters(query?: GetMonstersQueryDto): Promise<Monster[]> {
    const where: any = {};

    if (query?.type) {
      where.type = query.type;
    }

    if (query?.name) {
      where.name = {
        contains: query.name,
        mode: 'insensitive',
      };
    }

    if (query?.minPrice !== undefined || query?.maxPrice !== undefined) {
      where.price = {};
      if (query.minPrice !== undefined) {
        where.price.gte = query.minPrice;
      }
      if (query.maxPrice !== undefined) {
        where.price.lte = query.maxPrice;
      }
    }

    const prismaMonsters = await this.prisma.monster.findMany({
      where,
      orderBy: { id: 'asc' },
    });

    return prismaMonsters.map((monster) =>
      this.transformPrismaMonster(monster),
    );
  }

  async getMonsterById(id: number): Promise<Monster | null> {
    const prismaMonster = await this.prisma.monster.findUnique({
      where: { id },
    });

    return prismaMonster ? this.transformPrismaMonster(prismaMonster) : null;
  }

  async getAllMonstersFromType(type: MonsterType): Promise<Monster[]> {
    const prismaMonsters = await this.prisma.monster.findMany({
      where: { type },
      orderBy: { id: 'asc' },
    });

    return prismaMonsters.map((monster) =>
      this.transformPrismaMonster(monster),
    );
  }
}
