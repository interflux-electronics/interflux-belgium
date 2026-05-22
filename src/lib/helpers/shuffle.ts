export function shuffle(list: string[]) {
  // Fisher-Yates shuffle
  // Avoid .sort(() => 0.5 - Math.random()))
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }

  return list;

  //   return list.sort(function () {
  //     return 0.5 - Math.random();
  //   });
}
