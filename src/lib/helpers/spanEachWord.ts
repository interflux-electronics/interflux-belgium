export function spanEachWord(phrase: string) {
  if (!phrase) {
    console.warn('no phrase');
    return;
  }

  const words = phrase.split(' ');

  const html = `<nobr><span class="word">${words.join('</span><span class="space">&nbsp;</span></nobr><nobr><span class="word">')}</span></nobr>`;

  return html;
}

// let textWithWordSpans = $derived.by(() => {
//   if (!label) {
//     console.warn('no @text passed into <Tag>');
//     return null;
//   }

//   if (typeof label !== 'string') {
//     console.warn('no valid string passed into <Tag>');
//     console.warn(label);
//     return null;
//   }

//   const words = label.split(' ');

//   const html = `<nobr><span class="word">${words.join(
//     '</span><span class="space">&nbsp;</span></nobr><nobr><span class="word">'
//   )}</span></nobr>`;

//   return html;
// });
