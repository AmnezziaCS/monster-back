import { Test, TestingModule } from '@nestjs/testing';
import { MonsterController } from './monster.controller';
import { MonsterService } from './monster.service';

describe('MonsterController', () => {
  let monsterController: MonsterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MonsterController],
      providers: [MonsterService],
    }).compile();

    monsterController = app.get<MonsterController>(MonsterController);
  });
});
