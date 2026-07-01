export default function capitalize(str: string): string {
  if (!str) {
    return '';
  }

  return str ? str[0].toUpperCase() + str.slice(1) : '';
}
