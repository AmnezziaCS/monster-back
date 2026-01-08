import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { MonsterService } from './monster.service';
import { ApiTags, ApiParam, ApiOkResponse } from '@nestjs/swagger';
import { MonsterDto } from './dto/monster.dto';
import { VALID_MONSTER_TYPES } from 'constants/const';
import { GetMonstersQueryDto } from 'dto/get-monsters-query.dto';

@ApiTags('Monsters')
@Controller()
export class MonsterController {
  constructor(private readonly monsterService: MonsterService) {}

  @Get('/monsters')
  @ApiOkResponse({ type: [MonsterDto] })
  async getAllMonsters(
    @Query() query: GetMonstersQueryDto,
  ): Promise<MonsterDto[]> {
    return this.monsterService.getAllMonsters(query);
  }

  @Get('/monsters/:id')
  @ApiOkResponse({ type: MonsterDto })
  async getMonsterById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MonsterDto> {
    const monster = await this.monsterService.getMonsterById(id);
    if (!monster) {
      throw new NotFoundException(`Monster with ID ${id} not found`);
    }
    return monster;
  }

  @Get('/monsters/type/:type')
  @ApiOkResponse({ type: [MonsterDto] })
  @ApiParam({
    name: 'type',
    enum: VALID_MONSTER_TYPES,
    example: 'Ultra',
    description: 'Monster product type (e.g., Ultra, Punch, Energy).',
  })
  async getAllMonstersFromType(
    @Param('type') type: string,
  ): Promise<MonsterDto[]> {
    const normalized = type.trim().toLowerCase();

    const matchedType = VALID_MONSTER_TYPES.find(
      (t) => t.toLowerCase() === normalized,
    );

    if (!matchedType) {
      throw new BadRequestException(
        `Invalid monster type: "${type}". Must be one of: ${VALID_MONSTER_TYPES.join(
          ', ',
        )}`,
      );
    }

    return this.monsterService.getAllMonstersFromType(matchedType);
  }
}
