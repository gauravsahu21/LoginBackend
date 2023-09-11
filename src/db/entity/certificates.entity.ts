import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({name:'certificates'})
export class Certificate extends BaseEntity  {
  @PrimaryGeneratedColumn()
  certificatesId: string;

  @Column()
  imageId: string;

  @Column()
  certificateName: string;

  @Column()
  certificateType: string;
}
