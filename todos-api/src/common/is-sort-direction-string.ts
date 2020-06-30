import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { SortDirection } from '../todos/models/sort-direction';

@ValidatorConstraint({ name: 'IsSortDirectionString', async: false })
export class IsSortDirectionString implements ValidatorConstraintInterface {
  validate(text: string): boolean {
    return !!SortDirection[text.toUpperCase()];
  }

  defaultMessage(): string {
    return 'Text ($value) must be one of (Asc, Desc)';
  }
}
