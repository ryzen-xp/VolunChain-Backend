import { Entity, Column, OneToMany,ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Volunteer } from './Volunteer';
// import { Organization } from './Organization';

@Entity()
export class Project extends BaseEntity {

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  location: string;

  @Column({ type: 'date', nullable: false })
  startDate: Date;

  @Column({ type: 'date', nullable: false })
  endDate: Date;

  // Commented out until the Organization file is available
  // @ManyToOne(() => Organization, (organization) => organization.projects, { nullable: false })
  // @JoinColumn({ name: 'organizationId' })
  // organization: Organization;

  @OneToMany(() => Volunteer, (volunteer) => volunteer.project)
  volunteers!: Volunteer[];
}
