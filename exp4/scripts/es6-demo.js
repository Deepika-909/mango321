//arrow function
let add = (a, b) => a + b;
console.log(add(2, 3));
//callback function
function fetch(callback) {
    setTimeout(() => {
        callback("Data fetched");
    }, 1000); 
}
fetch((data) => {
    console.log(data);
});
//promise
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise resolved");
    }, 1000);
});

promise.then((message) => {
    console.log(message);
});
promise.catch((error) => {
    console.error(error);
});
//async
const demo = async () => {
  const r = await fetch('https://api.github.com/users');
  const d = await r.json();
  console.log(d[0].login);
};
demo();
