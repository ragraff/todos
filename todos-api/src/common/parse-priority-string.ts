import { PipeTransform, BadRequestException } from '@nestjs/common';
import { Priority } from '../todos/models/priority';

export class ParsePriorityStringPipe implements PipeTransform<string> {
  transform(value: string): Priority {
    const upperValue = value.toUpperCase();
    if (upperValue != null && !Priority[upperValue]) {
      throw new BadRequestException(
        `Text (${value}) must be one of (Low, Medium, High, Urgent).`,
      );
    }

    return Priority[upperValue];
  }
}
