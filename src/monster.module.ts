import { Module } from '@nestjs/common';
import { MonsterController } from './monster.controller';
import { MonsterService } from './monster.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [MonsterController],
  providers: [MonsterService, PrismaService],
})
export class MonsterModule {}
