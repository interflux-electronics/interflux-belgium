export function mark(phrase: string, query: string) {
  const regex = new RegExp(query.trim(), 'gi');

  return phrase.replace(regex, '<mark>$&</mark>');
}
