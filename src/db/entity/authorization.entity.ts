import { ProfileType, UserType } from "src/common/models/user.model"
import { Entity, PrimaryColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm"

@Entity("authorization")
export class Authorization extends BaseEntity {
    @PrimaryColumn()
    profileId: string;

    @Column({ length: 100 })
    userId: string;

    @Column({ length: 100 })
    password: string;

    @Column({ length: 20 })
    profileType: ProfileType;

    @Column({ length: 100 })
    firstName: string;

    @Column({ length: 50 })
    lastName: string;

    @Column({ length: 255, nullable: true })
    imageId: string;

    @Column({ nullable: true })
    resetPasswordToken: string

    @Column({ nullable: true })
    resetPasswordExpire: string
}