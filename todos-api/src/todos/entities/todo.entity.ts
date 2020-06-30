import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Priority } from '../models/priority';

@Entity()
export class Todo {
  // @PrimaryGeneratedColumn('uuid')
  // id: string;

  @Column('varchar', { length: 200 })
  title: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('enum', { enum: Priority, nullable: true })
  priority?: Priority;

  @Column('date', { nullable: true })
  dueDate?: Date;

  // @CreateDateColumn()
  // createDate?: Date;

  // @UpdateDateColumn()
  // updatedDate?: Date;
}
