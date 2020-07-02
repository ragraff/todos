import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Priority } from '../interfaces/priority';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false, length: 200 })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('enum', { enum: Priority, default: Priority.LOW })
  priority: Priority;

  @Column('datetime', { nullable: true })
  dueDate: Date;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
