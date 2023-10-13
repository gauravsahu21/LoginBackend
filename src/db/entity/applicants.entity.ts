/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('applicants')
export class Applicant extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'applicantId' })
  applicantId: string;

  @Column({ type: 'varchar', length: 255 })
  applicantName: string;

  @Column({ type: 'json', nullable: true })
  contact: object;

  @Column({ type: 'json', nullable: true })
  experienceinfo: object;

  @Column({ type: 'varchar', length: 255 })
  resumeId: string;

  @Column({ type: 'text' })
  s3Link: string;

  @Column({ type: 'datetime' })
  appliedOn: Date;

  @Column({ type: 'varchar', length: 255 })
  careerId: string;

  @Column({ type: 'int', width: 1 })
  applicantStatus: number;
}
