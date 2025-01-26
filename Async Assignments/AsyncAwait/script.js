async function fetchDataAsync() {
  try {
    const response = await fetch("https://dummyjson.com/posts");
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data.posts;
  } catch (error) {
    throw error;
  }
}

document.getElementById("asyncBtn").addEventListener("click", async function () {
  document.getElementById("asyncDiv").innerText = "Loading...";
  try {
    const posts = await fetchDataAsync();
    document.getElementById("asyncDiv").innerText = posts.map(post => post.title).join("\n");
  } catch (error) {
    document.getElementById("asyncDiv").innerText = `Error: ${error.message}`;
  }
});
