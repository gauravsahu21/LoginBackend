import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";

@Entity({ name: 'catelogues' })
export class CatalogueEntity extends BaseEntity{
    @PrimaryColumn({ type: 'varchar', length: 255 })
    catelogueId: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    imageId: string;

    @Column({ type: 'text', nullable: true })
    s3link: string;

    @Column({ type: 'varchar', length: 100 })
    productName: string;

    @Column({ type: 'varchar', length: 100 })
    productCategory: string;

    @Column({ type: 'varchar', length: 255 })
    brandId: string;

    @Column({ type: 'int', width: 5 })
    orderId: number;

    @Column({ type: 'json' })
    productDetails: any;

    @Column({ type: 'varchar', length: 255 })
    videoBucketId: string

    @Column({ type: 'varchar', length: 255 })
    thumbnailId: string

    @Column({ type: 'text', nullable: true })
    s3linkVideo:string

    @Column({ type: 'text', nullable: true })
    s3linkThumbnail:string;
}
