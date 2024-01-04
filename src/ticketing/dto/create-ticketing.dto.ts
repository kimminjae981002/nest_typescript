import { PickType } from '@nestjs/mapped-types';

import { Ticketing } from '../entities/ticketing.entity';

// picktype 이것만 사용하겠따.
export class CreateTicketingDto extends PickType(Ticketing, [
  'userId',
  'showId',
  'numberOfTickets',
] as const) {}
