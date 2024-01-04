import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import _ from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService, // JWT 토큰 생성을 위해 주입한 서비스
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, age, name, confirmPassword } = createUserDto;
    if (!email || !password || !age || !name) {
      return '빈칸을 채우세요.';
    }

    if (password !== confirmPassword) {
      return '비밀번호를 확인하세요.';
    }

    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      );
    }

    const hashedPassword = await hash(password, 10);
    await this.userRepository.save({
      email: email,
      password: hashedPassword,
      age: age,
      name: name,
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['userId', 'password', 'email', 'is_admin', 'point'],
      where: { email },
    });

    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    const payload = {
      email,
      userId: user.userId,
      is_admin: user.is_admin,
      point: user.point,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async checkUser(
    name: string,
    point: number,
    email: string,
    is_admin: boolean,
  ) {
    const user = await this.userRepository.findOne({
      select: ['userId', 'name', 'point', 'is_admin'],
      where: { email },
    });

    return user;
  }

  async updateUser(user: User): Promise<void> {
    await this.userRepository.save(user);
  }
}
