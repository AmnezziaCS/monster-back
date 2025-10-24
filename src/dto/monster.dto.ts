import { ApiProperty } from '@nestjs/swagger';
import { VALID_MONSTER_TYPES } from '../types/globalTypes';

export class MonsterDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Monster Energy' })
  name: string;

  @ApiProperty({
    enum: VALID_MONSTER_TYPES,
    example: 'Ultra',
    description: 'The Monster product type (e.g., Ultra, Punch, Energy).',
  })
  type: (typeof VALID_MONSTER_TYPES)[number];

  @ApiProperty({
    example:
      'The monster ultra white is a refreshing energy drink with a crisp taste.',
  })
  description: string;

  @ApiProperty({ example: 2.99 })
  price: number;

  @ApiProperty({ example: 'https://example.com/monster-ultra-white.jpg' })
  imageUrl: string;
}
