import fetch from "node-fetch";

// arrow function
let add = (a, b) => a + b;
console.log(add(2, 3));

// callback function — renamed to avoid clashing with real fetch
function fakeFetchCallback(cb) {
  setTimeout(() => cb("Data fetched"), 1000);
}
fakeFetchCallback((data) =>  {
    console.log(data)
});

// promise
let promise = new Promise((request,resolve) => {
  setTimeout(() => {
    resolve("Promise resolved");
  }, 1000);
});

promise.then(msg => console.log(msg))
       .catch(err => console.error(err));

// async using node-fetch
const demo = async () => {
  const r = await fetch('https://api.github.com/users');
  const d = await r.json();
  console.log(d[0].login);
};
demo();
