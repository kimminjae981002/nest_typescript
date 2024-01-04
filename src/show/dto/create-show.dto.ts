import { PickType } from '@nestjs/mapped-types';

import { Show } from '../entities/show.entity';

// picktype 이것만 사용하겠따.
export class CreateShowDto extends PickType(Show, [
  'name',
  'category',
  'description',
  'price',
  'venue',
  'price',
  'dates',
  'image',
  'ticket',
] as const) {}
