import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateTicketingDto } from './dto/create-ticketing.dto';
import { UpdateTicketingDto } from './dto/update-ticketing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticketing } from './entities/ticketing.entity';
import { Show } from '../show/entities/show.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketingService {
  constructor(
    @InjectRepository(Ticketing)
    private readonly ticketingRepository: Repository<Ticketing>,
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) {}

  async create(userId: number, showId: number, numberOfTickets: number) {
    const ticketing = this.ticketingRepository.create({
      userId,
      showId,
      numberOfTickets,
    });

    await this.ticketingRepository.save(ticketing);
  }

  findAll(userId: number) {
    return this.ticketingRepository.find({ where: { userId } });
  }

  findOne(id: number) {
    return `This action returns a #${id} ticketing`;
  }

  remove(arg0: number) {
    throw new Error('Method not implemented.');
  }
  update(arg0: number, updateTicketingDto: UpdateTicketingDto) {
    throw new Error('Method not implemented.');
  }
}
