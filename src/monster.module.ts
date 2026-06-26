import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { MonsterController } from './monster.controller';
import { MonsterService } from './monster.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [MonsterController],
  providers: [MonsterService, PrismaService],
})
export class MonsterModule {}
