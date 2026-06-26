import { ApiProperty } from '@nestjs/swagger';

export class PriceRangeDto {
  @ApiProperty({ example: 2.5 })
  min: number;

  @ApiProperty({ example: 5.0 })
  max: number;
}
