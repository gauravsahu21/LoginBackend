/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('careers')
export class CareerEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  careerId: string;

  @Column({ type: 'varchar', length: 200 })
  jobTitle: string;

  @Column({ type: 'json' })
  experienceLevel: { min: number; max: number };

  @Column({ type: 'int' })
  jobstatus: number;

  @Column({ type: 'int' })
  workMode: number;

  @Column({ type: 'json' })
  location: { city: string; state: string; country: string };

  @Column({ type: 'smallint' })
  noOfOpenings: number;

  @Column({ type: 'varchar', length: 30 })
  publishDate: Date;

  @Column({ type: 'varchar', length: 30 })
  unPublishDate: Date;

  @Column({ type: 'smallint' })
  employementType: number;

  @Column({ type: 'varchar', length: 50 })
  department: string;

  @Column({ type: 'varchar', length: 30 })
 createdDate: string;

  @Column({ type: 'json' })
  description: {
    company: string;
    responbilities: string;
    education: string;
    additionalInfo: string;
    skills: string[];
  };
}
