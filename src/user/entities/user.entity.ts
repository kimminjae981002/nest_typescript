import { IsString, IsEmail, IsInt, IsBoolean, IsNumber } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @IsEmail()
  @Column('varchar', { length: 100, nullable: false })
  email: string;

  @IsString()
  @Column('varchar', { length: 100, select: false, nullable: false })
  password: string;

  @IsString()
  @Column('varchar', { length: 20, nullable: false })
  name: string;

  @IsInt()
  @Column('bigint', { nullable: false })
  age: number;

  @IsNumber()
  @Column('bigint', { nullable: false, default: 1000000 })
  point: number;

  @IsBoolean()
  @Column('boolean', { nullable: false, default: false })
  is_admin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
