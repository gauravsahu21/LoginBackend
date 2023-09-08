

import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm"

@Entity({ name: 'college_information' })
export class CollegeInformation extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 10 })
    code: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'text' })
    address: string;

    @Column({ type: 'varchar', length: 18 })
    contact: string;

    @Column({ type: 'varchar', length: 100 })
    email: string;

    @Column({ type: 'varchar', length: 100 })
    website: string;

    @Column({ type: 'text', name: 'exam_link' })
    examLink: string;

    @Column({ type: 'text', name: 'notice_board' })
    noticeBoard: string;

    @Column({ type: 'json', })
    social: Record<string, any>;

    @Column({ type: 'varchar', length: 10, name: 'university_code' })
    universityCode: string;

    @Column({ type: 'json', name: 'course_info', })
    courseInfo: Record<string, any>;

    @Column({ type: 'text', name: 'regularization_number' })
    regularizationNumber: string;

    @Column({ type: 'varchar', length: 10, name: 'ids_shortform' })
    idsShortform: string;

    @Column({ type: 'int', name: 'ids_format' })
    idsFormat: number;

    @Column({ type: 'varchar', name: 'logoid', nullable: true })
    logoId: string;
}
