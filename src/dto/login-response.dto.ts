import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ example: 'admin' })
  username: string;

  @ApiProperty({ example: true })
  isAdmin: boolean;
}
