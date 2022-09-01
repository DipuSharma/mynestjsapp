import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({name: 'file'})
export class File {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 255, default: ''})
    filename: string;

    @Column({ type: "varchar", length: 255, default: ''})
    filepath: string

    @Column({ type: "varchar", length: 255, default: '', select: false})
    originalName: string

    @Column({ type: "varchar", length: 255, default: ''})
    mime: string


}