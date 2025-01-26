function fetchDataWithPromise() {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject("Operation timed out");
    }, 5000);

    fetch("https://dummyjson.com/posts")
      .then(response => response.json())
      .then(data => {
        clearTimeout(timeout);
        resolve(data.posts);
      })
      .catch(error => reject(error));
  });
}

document.getElementById("promiseBtn").addEventListener("click", function () {
  document.getElementById("promiseDiv").innerText = "Loading...";
  fetchDataWithPromise()
    .then(posts => {
      document.getElementById("promiseDiv").innerText = posts.map(post => post.title).join("\n");
    })
    .catch(error => {
      document.getElementById("promiseDiv").innerText = `Error: ${error}`;
    });
});
