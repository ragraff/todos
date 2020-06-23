import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Todo extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  priority: string;

  @Prop()
  dueDate: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
