import { Priority } from './priority';

export interface TodoFilter {
  _ids?: string[];
  titles?: string[];
  priorities?: Priority[];
  startOfRange?: Date;
  endOfRange?: Date;
}
