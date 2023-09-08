import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'profile_basic' })
export class ProfileBasic extends BaseEntity {
    @PrimaryColumn()
    profile_id: string;

    @Column({ length: 100 })
    firstname: string;

    @Column({ length: 100 })
    lastname: string;

    @Column({ length: 34 })
    dob: string;

    @Column({ length: 100 })
    email: string;

    @Column({ length: 14 })
    phone: string;

    @Column({ type: 'text' })
    communication_address1: string;

    @Column({ type: 'text' })
    communication_address2: string;

    @Column({ length: 50 })
    communication_city: string;

    @Column({ length: 20 })
    communication_state: string;

    @Column({ length: 20 })
    communication_country: string;

    @Column({ type: 'text' })
    permenant_address1: string;

    @Column({ type: 'text' })
    permenant_address2: string;

    @Column({ length: 50 })
    permenant_city: string;

    @Column({ length: 20 })
    permenant_state: string;

    @Column({ length: 20 })
    permenant_country: string;

    @Column({ type: 'text' })
    image_name: string;
}