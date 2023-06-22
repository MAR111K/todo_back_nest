import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'example', description: 'Text' })
  readonly text: string;

  @ApiProperty({ example: 'group_id', description: '1' })
  readonly group_id: number;
}
