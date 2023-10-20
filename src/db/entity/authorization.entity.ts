/* eslint-disable prettier/prettier */
import { ProfileType, UserType } from 'src/common/models/user.model';
import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('authorization')
export class Authorization extends BaseEntity {
  @PrimaryColumn('uuid', { name: 'profileId' })
  profileId: string;

  @Column({ name: 'userId', length: 100 })
  userId: string;

  @Column({ name: 'password', length: 255 })
  password: string;

  @Column({ name: 'profileType', length: 20 })
  profileType: string;

  @Column({ name: 'firstName', length: 100 })
  firstName: string;

  @Column({ name: 'lastName', length: 100 })
  lastName: string;

  @Column({ name: 'emailId', length: 200 })
  emailId: string;

  @Column({ name: 'imageId', length: 255 })
  imageId: string;

  @Column({ name: 's3link', type: "text" })
  s3link: string;

  @Column('json', { name: 'permissions', nullable: true })
  permissions: any | null;

  @Column('json', { name: 'brandIds', nullable: true })
  brandIds: any | null;

  @Column({ name: 'resetPasswordToken', length: 255 })
  resetPasswordToken: string;

  @Column({ name: 'resetPasswordExpire', length: 255 })
  resetPasswordExpire: string;
}
