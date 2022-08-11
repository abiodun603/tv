export function oneByOne(...list) {
  const collection = [];

  const max = Math.max(...list.map((arr) => arr.length));

  for (let i = 0; i < max; i++) {
    list.forEach((arr) => {
      const data = arr[i];

      if (typeof data !== 'undefined') {
        collection.push(data);
      }
    });
  }

  return collection;
}
