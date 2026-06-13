export function spanEachWord(phrase: string) {
  if (!phrase) {
    console.warn('no phrase');
    return;
  }

  const words = phrase.split(' ');

  const html = `<nobr><span class="word">${words.join('</span><span class="space">&nbsp;</span></nobr><nobr><span class="word">')}</span></nobr>`;

  return html;
}
