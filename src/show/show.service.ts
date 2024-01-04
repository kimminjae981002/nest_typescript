import { Injectable, Query } from '@nestjs/common';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { Repository } from 'typeorm';
import { Show, ShowCategory } from './entities/show.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ShowService {
  findOneOrFail: any;
  constructor(
    @InjectRepository(Show) private showRepository: Repository<Show>,
    private jwtService: JwtService, // JWT 토큰 생성을 위해 주입한 서비스
  ) {}

  async create(createShowDto: CreateShowDto) {
    const { name, description, venue, price, category, image, dates, ticket } =
      createShowDto;

    if (!name || !description || !venue || !image || !dates) {
      return '빈칸을 채우세요.';
    }

    await this.showRepository.save({
      name,
      description,
      venue,
      price,
      category,
      image,
      dates,
      ticket,
    });
  }

  async findAll() {
    return await this.showRepository.find();
  }

  async findByCategory(category: ShowCategory) {
    return this.showRepository.find({ where: { category } });
  }

  async findByName(name: string) {
    return this.showRepository.find({ where: { name } });
  }

  async findOne(showId: number) {
    return this.showRepository.findOne({ where: { showId } });
  }

  async updateShow(show: Show): Promise<void> {
    await this.showRepository.save(show);
  }

  remove(id: number) {
    return `This action removes a #${id} show`;
  }
}
