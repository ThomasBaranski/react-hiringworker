const revFunc = (num) => {
  count = [1, 2, 3, 4];
  console.log(count);
};
console.log(revFunc());

const smallEven = (n) => {
  if (n % 2 !== 0) return n;
  return smallEven(n / 2);
};
console.log(smallEven(100));
