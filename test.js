const promise1 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, "One")
);
const promise2 = new Promise((resolve) => setTimeout(resolve, 2000, "Two"));
const promise3 = new Promise((resolve) => setTimeout(resolve, 50, "Three"));

Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log(values); // Kết quả: ['One', 'Two', 'Three'] sau khoảng 200ms (thời gian của Promise lâu nhất)
  })
  .catch((error) => {
    console.log("1");
    console.error(error); // Sẽ không được gọi vì tất cả Promise đã hoàn thành thành công
  });
