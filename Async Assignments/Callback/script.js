function simulateCallback(callback) {
    setTimeout(() => {
      callback();
    }, 5000);
  }
  
  document.getElementById("callbackBtn").addEventListener("click", function() {
    simulateCallback(() => {
      document.getElementById("callbackDiv").innerText = "Callback executed after 5 seconds";
    });
  });

  function fetchData(callback) {
    setTimeout(() => {
      fetch("https://dummyjson.com/posts")
        .then(response => response.json())
        .then(data => {
          callback(data.posts);
        });
    }, 5000);
  }
  
  document.getElementById("callbackBtn").addEventListener("click", function() {
    document.getElementById("callbackDiv").innerText = "Loading...";
    fetchData((posts) => {
      document.getElementById("callbackDiv").innerText = posts.map(post => post.title).join("\n");
    });
  });