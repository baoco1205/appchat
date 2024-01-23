let time1 = Date.now();
console.log(time1);
let i = 0;
let n = 1000000000;
while (i < n) {
  i = i + 5;
}
let time2 = Date.now();
let sum = time2 - time1;
console.log(sum * 10);
