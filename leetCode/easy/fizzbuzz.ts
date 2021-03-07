function fizzbuzz(size: number = 0) : string[] {
  const output = [];
  for (let i = 1; i <= size; i++) {
    let value = '';
    if (i % 3 === 0) {
      value = 'fizz';
    }
    if (i % 5 === 0) {
      value = `${value}buzz`;
    }

    output.push(value || `${i}`);
  }
  return output;
}

export {
  fizzbuzz,
};