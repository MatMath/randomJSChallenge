function fizzbuzz(size: number = 0) : string[] {
  const output = [];
  for (let i = 1; i <= size; i++) {
    output.push(( i%3 ? '' : 'fizz' ) + ( i%5 ? '' : 'buzz' ) || i)
  }
  return output;
}

export {
  fizzbuzz,
};