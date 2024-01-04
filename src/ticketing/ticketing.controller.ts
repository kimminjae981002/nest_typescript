import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { TicketingService } from './ticketing.service';
import { UpdateTicketingDto } from './dto/update-ticketing.dto';
import { ShowService } from 'src/show/show.service';
import { UserService } from 'src/user/user.service';
import { EntityManager } from 'typeorm';

@Controller('ticketing')
export class TicketingController {
  constructor(
    private readonly ticketingService: TicketingService,
    private readonly showService: ShowService,
    private readonly userService: UserService,
    private readonly entityManager: EntityManager,
  ) {}

  @Post(':showId')
  async create(@Param('showId') showId: number, @Req() req: any) {
    const user = req.user;
    const show = await this.showService.findOne(showId);

    if (!show) {
      throw new NotFoundException('공연이 없습니다.');
    }

    if (user.point < show.price) {
      throw new Error('금액이 부족합니다.');
    }

    if (+show.ticket > 0) {
      user.point -= show.price;
      await this.userService.updateUser(user);
      show.ticket -= 1;
      await this.showService.updateShow(show);

      await this.ticketingService.create(user.userId, show.showId, show.ticket);

      return {
        userName: user.name,
        showName: show.name,
        dates: show.dates,
        venue: show.venue,
        price: show.price,
      };
    } else if (+show.ticket === 0) {
      throw new Error('매진입니다.');
    }
  }

  @Get()
  findAll(@Req() req: any) {
    const user = req.user;
    return this.ticketingService.findAll(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketingDto: UpdateTicketingDto,
  ) {
    return this.ticketingService.update(+id, updateTicketingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketingService.remove(+id);
  }
}
