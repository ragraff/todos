import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Priority } from '../todos/models/priority';
import { SortType } from '../todos/models/sort-type';
import { SortDirection } from '../todos/models/sort-direction';

@ValidatorConstraint({ name: 'IsPriorityString', async: false })
export class IsPriorityString implements ValidatorConstraintInterface {
  validate(text: string): boolean {
    return !!Priority[text.toUpperCase()];
  }

  defaultMessage(): string {
    return 'Text ($value) must be one of (Low, Medium, High, Urgent).';
  }
}

@ValidatorConstraint({ name: 'IsSortTypeString', async: false })
export class IsSortTypeString implements ValidatorConstraintInterface {
  validate(text: string): boolean {
    return !!SortType[text.toUpperCase()];
  }

  defaultMessage(): string {
    return 'Text ($value) must be one of (Title, Priority, DueDate)';
  }
}

@ValidatorConstraint({ name: 'IsSortDirectionString', async: false })
export class IsSortDirectionString implements ValidatorConstraintInterface {
  validate(text: string): boolean {
    return !!SortDirection[text.toUpperCase()];
  }

  defaultMessage(): string {
    return 'Text ($value) must be one of (Asc, Desc)';
  }
}
