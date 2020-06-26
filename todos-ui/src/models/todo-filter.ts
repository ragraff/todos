export interface TodoFilter {
  title?: string | null;
  priorities?: string[] | null;
  startOfRange?: Date | null;
  endOfRange?: Date | null;
}
