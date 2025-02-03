import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  walletAddress: string;

  @Column()
  role: string;
}
