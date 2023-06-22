import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskGroupDto {
  @ApiProperty({ example: 'example', description: 'Title' })
  readonly title: string;

  @ApiProperty({ example: 'creator', description: '1' })
  readonly creator: number;
}
