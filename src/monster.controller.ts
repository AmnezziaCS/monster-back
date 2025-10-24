import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MonsterService } from './monster.service';
import { Monster, VALID_MONSTER_TYPES } from './types/globalTypes';
import { ParseMonsterTypePipe } from './pipes/parse-monster-type.pipe';
import { MonsterTypeParamDto } from './dto/monster-type-param.dto';
import { ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('Monsters')
@Controller()
export class MonsterController {
  constructor(private readonly monsterService: MonsterService) {}

  @Get('/monsters')
  getAllMonsters(): Monster[] {
    return this.monsterService.getAllMonsters();
  }

  @Get('/monsters/:id')
  getMonsterById(@Param('id', ParseIntPipe) id: number): Monster | undefined {
    return this.monsterService.getMonsterById(id);
  }

  @Get('/monsters/type/:type')
  @ApiParam({
    name: 'type',
    enum: VALID_MONSTER_TYPES,
    example: 'Ultra',
    description: 'The Monster product type (e.g., Ultra, Punch, Energy).',
  })
  getMonstersByType(
    @Param('type', ParseMonsterTypePipe) type: MonsterTypeParamDto['type'],
  ): Monster[] {
    return this.monsterService.getMonstersByType(type);
  }
}
