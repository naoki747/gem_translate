navigator.serviceWorker.addEventListener("message", (event) => {
  const a = document.createElement("a");
  a.href = event.data.url;
  a.style.display = "none";

  document.body.appendChild(a);
  a.click();
});