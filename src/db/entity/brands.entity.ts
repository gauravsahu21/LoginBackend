/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";

@Entity({ name: 'brands' })
export class BrandEntity extends BaseEntity {
    
    @PrimaryColumn({ type: 'varchar', length: 255 })
    brandId: string;

    @Column({ type: 'varchar', length: 100 })
    brandName: string;
    
    @Column({ type: 'text' })
    Description: string;

    @Column({ type: 'json', nullable: true })
    productCategory: any;

    @Column({ type: 'text', nullable: true })
    website: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    imageId: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    s3Link: string;

    @Column({type:'json'})
    sellers: []
}
