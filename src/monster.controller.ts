import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MonsterService } from './monster.service';
import { ParseMonsterTypePipe } from './pipes/parse-monster-type.pipe';
import { MonsterTypeParamDto } from './dto/monster-type-param.dto';
import { ApiTags, ApiParam, ApiOkResponse } from '@nestjs/swagger';
import { MonsterDto } from './dto/monster.dto';
import { VALID_MONSTER_TYPES } from 'types/globalTypes';

@ApiTags('Monsters')
@Controller()
export class MonsterController {
  constructor(private readonly monsterService: MonsterService) {}

  @Get('/monsters')
  @ApiOkResponse({ type: [MonsterDto] })
  getAllMonsters(): MonsterDto[] {
    return this.monsterService.getAllMonsters();
  }

  @Get('/monsters/:id')
  @ApiOkResponse({ type: MonsterDto })
  getMonsterById(@Param('id', ParseIntPipe) id: number): MonsterDto {
    return this.monsterService.getMonsterById(id);
  }

  @Get('/monsters/type/:type')
  @ApiParam({
    name: 'type',
    enum: VALID_MONSTER_TYPES,
    example: 'Ultra',
    description: 'The Monster product type (e.g., Ultra, Punch, Energy).',
  })
  @ApiOkResponse({ type: [MonsterDto] })
  getMonstersByType(
    @Param('type', ParseMonsterTypePipe) type: MonsterTypeParamDto['type'],
  ): MonsterDto[] {
    return this.monsterService.getMonstersByType(type);
  }
}
