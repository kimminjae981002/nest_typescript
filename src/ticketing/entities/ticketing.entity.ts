import { IsInt } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'tickets',
})
export class Ticketing {
  @PrimaryGeneratedColumn()
  ticketId: number;

  @IsInt()
  @Column('bigint', { default: 0, nullable: false })
  userId: number;

  @IsInt()
  @Column('bigint', { nullable: false })
  showId: number;

  @IsInt()
  @Column('bigint', { nullable: false })
  numberOfTickets: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
