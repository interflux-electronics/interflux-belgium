export function mark(phrase: string, query: string) {
  if (!query || query === '') {
    return phrase;
  }

  let str = phrase;

  // Break the query down
  const words = query.trim().split(' ');

  // Wrap each instance of a word with <<< >>> placeholders
  words.forEach((word) => {
    const regex = new RegExp(word, 'gi');

    str = str.replace(regex, '<<<$&>>>');
  });

  // Replace the placeholders with actual HTML markers
  str = str.replaceAll(/<<</g, '<mark>');
  str = str.replaceAll(/>>>/g, '</mark>');

  // Why placeholders?
  // To avoid <mark> tags from the first word to be matched by the next words.

  // How to reproduce?
  // Suppose the first word matches the query, then <mark> are added to `str`.
  // If the second word includes the letters m, a, r or k, the HTML will be broken.

  return str;
}
