import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity({ name: 'impersonate_user' })
export class ImpersonateUser extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    impersonatingUser: string;
    @Column()
    impersonatedUser: string;

    @Column()
    login_timestamp: Date;

}
