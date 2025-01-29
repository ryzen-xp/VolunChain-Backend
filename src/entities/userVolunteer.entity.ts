import { Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';
// import { User } from './User';
// import { Volunteer } from './Volunteer';

@Entity()
export class UserVolunteer {
  @PrimaryColumn('uuid')
  userId: string; // Simple reference field for now

  @PrimaryColumn('uuid')
  volunteerId: string; // Simple reference field for now

  // Relation with User commented
  /*
  @ManyToOne(() => User, (user) => user.userVolunteers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
  */

  // Relation with Volunteer commented
  /*
  @ManyToOne(() => Volunteer, (volunteer) => volunteer.userVolunteers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'volunteerId' })
  volunteer: Volunteer;
  */

  @CreateDateColumn()
  joinedAt: Date;
}