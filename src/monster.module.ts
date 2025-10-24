import { Module } from '@nestjs/common';
import { MonsterController } from './monster.controller';
import { MonsterService } from './monster.service';

@Module({
  imports: [],
  controllers: [MonsterController],
  providers: [MonsterService],
})
export class MonsterModule {}
