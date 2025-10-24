import { ApiProperty } from '@nestjs/swagger';
import { MonsterType, VALID_MONSTER_TYPES } from '../types/globalTypes';

/**
 * DTO for the '/monsters/type/:type' route parameter.
 */
export class MonsterTypeParamDto {
  @ApiProperty({
    description: 'The category type of Monster Energy product to filter by.',
    enum: VALID_MONSTER_TYPES,
    example: 'Ultra',
  })
  type: MonsterType;
}
