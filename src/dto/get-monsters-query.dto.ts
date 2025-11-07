import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { MonsterType } from '../types/types';
import { VALID_MONSTER_TYPES } from 'constants/const';
import { Type } from 'class-transformer';

export class GetMonstersQueryDto {
  @ApiPropertyOptional({
    description: 'Filter monsters by type.',
    enum: VALID_MONSTER_TYPES,
    example: 'Ultra',
  })
  @IsOptional()
  @IsEnum(VALID_MONSTER_TYPES)
  type?: MonsterType;

  @ApiPropertyOptional({
    description: 'Filter monsters by partial name match (case-insensitive).',
    example: 'mango',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Minimum price required (filters out cheaper products).',
    example: 2.5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({
    description: 'Maximum price allowed (filters out more expensive products).',
    example: 5.0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;
}
