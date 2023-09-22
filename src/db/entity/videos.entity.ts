import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('videos')
export class VideoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  videoId: string;

  @Column()
  orderId: number;

  @Column()
  title: string;

  @Column()
  duration: number;

  @Column()
  description: string;

  @Column()
  videoBucketId: string;

  @Column()
  s3link: string;

  @Column({ type: "json" })
  tags: {};
}
