/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";

@Entity({ name: 'pictures' })
export class ImagesEntity extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 255 })
    brandId: string;

    @Column({type:'json'})
    information: string[]

}