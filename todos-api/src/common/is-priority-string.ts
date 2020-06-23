import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Priority } from '../todos/models/priority';

@ValidatorConstraint({ name: 'IsPriorityString', async: false })
export class IsPriorityString implements ValidatorConstraintInterface {
  validate(text: string): boolean {
    return !!Priority[text.toUpperCase()];
  }

  defaultMessage(): string {
    return 'Text ($value) must be one of (Low, Medium, High, Urgent).';
  }
}
