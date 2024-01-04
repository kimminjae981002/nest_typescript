import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ForbiddenException,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ShowService } from './show.service';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { ShowCategory } from './entities/show.entity';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Post('create')
  async create(@Body() createShowDto: CreateShowDto, @Req() req: any) {
    const user = req.user;

    if (!user.is_admin) {
      throw new ForbiddenException('관리자만 생성할 수 있습니다.');
    }

    return this.showService.create(createShowDto);
  }

  @Get()
  findAll(
    @Query('category') category: ShowCategory,
    @Query('name') name: string,
  ) {
    if (category) {
      return this.showService.findByCategory(category);
    } else if (name) {
      return this.showService.findByName(name);
    }

    return this.showService.findAll();
  }

  @Get(':showId')
  async findOne(@Param('showId') showId: number) {
    const show = await this.showService.findOne(showId);

    if (!show) {
      throw new NotFoundException('공연이 없습니다.');
    }

    let message = '';

    if (show.ticket > 0) {
      message = `현재 수량 ${show.ticket} 남았습니다.`;
    } else {
      message = '매진';
    }

    return {
      name: show.name,
      ticket: message,
    };
  }
}
