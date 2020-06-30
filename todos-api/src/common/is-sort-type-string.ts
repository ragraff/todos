import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { SortType } from '../todos/models/sort-type';

@ValidatorConstraint({ name: 'IsSortTypeString', async: false })
export class IsSortTypeString implements ValidatorConstraintInterface {
  validate(text: string): boolean {
    return !!SortType[text.toUpperCase()];
  }

  defaultMessage(): string {
    return 'Text ($value) must be one of (Title, Priority, DueDate)';
  }
}
