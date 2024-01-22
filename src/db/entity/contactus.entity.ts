/* eslint-disable prettier/prettier */
import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity({ name: 'contactus' })
export class ContactUsEntity extends BaseEntity {

    @PrimaryColumn({ type: 'varchar', length: 255 })
    contactUsId: string;

    @Column({ type: 'varchar', length: 10 })
    contactUsType: string;

    @Column({ type: 'text' })
    message: string;

    @Column({ type: 'varchar', length: 5 })
    countryCode: string;

    @Column({ type: 'varchar', length: 11 })
    contactNumber: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    connectorName: string;

    @Column({ type: 'json', nullable: true })
    contactSubject: any;

    @Column({ type: 'datetime' })
    contactTime: Date;

    @Column({ type: 'tinyint' })
    connectStatus: number;

    @Column({ type: 'text', nullable: true })
    additionalNotes: string;

    @Column({ type: 'varchar', length: 100 })
    contactType: string;

    @Column({ type: 'varchar', length: 45 })
    product: string;
}
