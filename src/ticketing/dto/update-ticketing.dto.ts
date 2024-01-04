import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketingDto } from './create-ticketing.dto';

export class UpdateTicketingDto extends PartialType(CreateTicketingDto) {}
