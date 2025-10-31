import { Test, TestingModule } from '@nestjs/testing';
import { MonsterController } from './monster.controller';
import { MonsterService } from './monster.service';
import { MonsterDto } from './dto/monster.dto';
import { GetMonstersQueryDto } from 'dto/get-monsters-query.dto';

const mockMonster: MonsterDto = {
  id: 5,
  name: 'Mega Monster',
  type: 'Ultra',
  description: 'A powerful Ultra-type monster.',
  price: 9.99,
  imageUrl: 'http://example.com/mega-monster.png',
};

describe('MonsterController', () => {
  let controller: MonsterController;
  let service: jest.Mocked<MonsterService>;

  beforeEach(async () => {
    const mockService: Partial<jest.Mocked<MonsterService>> = {
      getAllMonsters: jest.fn(),
      getMonsterById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonsterController],
      providers: [{ provide: MonsterService, useValue: mockService }],
    }).compile();

    controller = module.get<MonsterController>(MonsterController);
    service = module.get(MonsterService);
  });

  describe('getAllMonsters', () => {
    it('should call monsterService.getAllMonsters with the query and return result', () => {
      const mockQuery: GetMonstersQueryDto = { type: mockMonster.type };
      const mockResult: MonsterDto[] = [
        { id: 1, name: 'Ultra Beast' } as MonsterDto,
      ];

      service.getAllMonsters.mockReturnValue(mockResult);

      const result = controller.getAllMonsters(mockQuery);
      expect(service.getAllMonsters).toHaveBeenCalledWith(mockQuery);
      expect(result).toEqual(mockResult);
    });
  });

  describe('getMonsterById', () => {
    it('should call monsterService.getMonsterById with id and return result', () => {
      service.getMonsterById.mockReturnValue(mockMonster);

      const result = controller.getMonsterById(5);

      expect(service.getMonsterById).toHaveBeenCalledWith(5);
      expect(result).toEqual(mockMonster);
    });
  });

  describe('getAllMonstersFromType', () => {
    it('should normalize lowercase type, find match, and call service', () => {
      const mockType = mockMonster.type.toLowerCase();
      const expectedType = mockMonster.type;
      const mockResult: MonsterDto[] = [
        { id: 2, name: 'Ultra Rage' } as MonsterDto,
      ];

      service.getAllMonsters.mockReturnValue(mockResult);

      const result = controller.getAllMonstersFromType(mockType);

      expect(service.getAllMonsters).toHaveBeenCalledWith({
        type: expectedType,
      });
      expect(result).toEqual(mockResult);
    });

    it('should trim type and still match', () => {
      const validType = mockMonster.type;
      const mockType = `   ${validType}   `;
      const mockResult: MonsterDto[] = [
        { id: 3, name: 'Punch Power' } as MonsterDto,
      ];

      service.getAllMonsters.mockReturnValue(mockResult);

      const result = controller.getAllMonstersFromType(mockType);

      expect(service.getAllMonsters).toHaveBeenCalledWith({ type: validType });
      expect(result).toEqual(mockResult);
    });
  });
});
