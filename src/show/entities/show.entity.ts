import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ShowCategory {
  a = 'a',
  b = 'b',
  c = 'c',
  d = 'd',
}

@Entity({
  name: 'shows',
})
export class Show {
  @PrimaryGeneratedColumn()
  showId: number;

  @IsString()
  @Column('varchar', { length: 100, nullable: false })
  name: string;

  @IsString()
  @Column('text', { nullable: true })
  description: string;

  @IsArray()
  @Column('text', { nullable: false })
  dates: Date[]; // 공연 날짜 및 시간을 배열로 저장

  @IsString()
  @Column('varchar', { length: 100, nullable: false })
  venue: string;

  @IsNumber()
  @Column('bigint', { nullable: false })
  price: number;

  @IsString()
  @Column('varchar', { length: 255, nullable: true })
  image: string; // 공연 이미지 URL

  @IsEnum(ShowCategory)
  @Column('enum', { enum: ShowCategory, default: 'a', nullable: true })
  category: ShowCategory; // 공연 카테고리

  @IsInt()
  @Column('bigint', { default: 0, nullable: false })
  ticket: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
