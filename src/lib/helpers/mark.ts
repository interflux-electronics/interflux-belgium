function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// This function replaces all occurances of substrings inside a larger string with <mark> tags.
// Most commonly a user types a few letters and spaces in a search bar and those letters are then
// highlighted in headings or bodies of text.
export function mark(html: string | undefined, search: string | undefined) {
  if (!search || !html) {
    return html;
  }

  // The search phrase is broken up into words.
  // Spaces inside the search term should be considered as 2 seperated searches and not as one
  // continuous string. This would enable a user typing "pac mlf" to find "Pacific MLF".
  const words = [
    ...new Set( // remove duplicates
      search
        .replaceAll(/[^a-zA-Z0-9 ]/g, '') // only consider letters and numbers
        .trim()
        .split(/\s+/) // break up search into words
        .filter(Boolean) // remove empty strings
        .map((word) => word.toLowerCase()) // prevent duplicates which only vary in case
    )
  ].sort((a, b) => b.length - a.length); // sort longest word to front

  if (words.length === 0) {
    return html;
  }

  // Concatenate all words into a regex.
  // Note that the longest search words will have been sorted to the front: interflux|flux|foo
  // We do this to avoid nested wraps <mark>Inter<mark>flux</mark><mark>.
  // If the regex matches "interflux", it will no longer look for "flux" and "foo".
  const wordPattern = new RegExp(`(${words.map(escapeRegExp).join('|')})`, 'gi');

  // Break the HTML into HTML tags (<[^>]*>) and text nodes ([^<]+)
  // Then only apply the find and replace on text nodes.
  // We do this so the orginal HTML markup remains in tact and does not interfefere with the search.
  return html.replace(/(<[^>]*>)|([^<]+)/g, (chunk, tag: string | undefined, text: string | undefined) => {
    if (tag) {
      return tag;
    }

    return text!.replace(wordPattern, '<mark>$&</mark>');
  });
}
