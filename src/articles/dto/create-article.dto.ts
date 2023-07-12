import { ApiProperty } from '@nestjs/swagger';
import { fail } from 'assert';

export class CreateArticleDto {
  @ApiProperty()
  title: string;
  @ApiProperty({ required: false })
  description?: string;
  @ApiProperty()
  body: string;
  @ApiProperty({ required: false, default: false })
  published?: boolean = false;
}
