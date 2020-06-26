export const toTitleCase = (value: string): string =>
  value.split(' ').map(wordToTitleCase).join(' ');

const wordToTitleCase = (value: string): string =>
  value.substring(0, 1).toUpperCase() + value.substring(1).toLowerCase();
