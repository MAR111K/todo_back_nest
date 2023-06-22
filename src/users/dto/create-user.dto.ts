import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'username', description: 'Username' })
  readonly username: string;

  @ApiProperty({ example: 'password', description: 'Password' })
  readonly password: string;
}
