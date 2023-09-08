import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity({ name: 'login_information' })
export class UserLoginHistory extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ type: "varchar", length: 255 })
    profileId: string;

    @Column({ type: "simple-array" })
    login_timestamps: Date[];

    addLoginTimestamp(timestamp: Date) {
        this.login_timestamps.unshift(timestamp);
        if (this.login_timestamps.length > 5) {
            this.login_timestamps.pop();
        }
    }
}
