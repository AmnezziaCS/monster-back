import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { VALID_MONSTER_TYPES, MonsterType } from '../types/globalTypes';

/**
 * Custom pipe to validate the 'type' route parameter against known MonsterType values.
 */
@Injectable()
export class ParseMonsterTypePipe
  implements PipeTransform<string, MonsterType>
{
  transform(value: string): MonsterType {
    const typeValue =
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

    if (!VALID_MONSTER_TYPES.includes(typeValue as MonsterType)) {
      throw new BadRequestException(
        `Invalid monster type: "${value}". Type must be one of: ${VALID_MONSTER_TYPES.join(
          ', ',
        )}`,
      );
    }
    return typeValue as MonsterType;
  }
}
