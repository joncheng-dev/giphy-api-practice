import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

window.addEventListener("load", formLoader);

function formLoader() {
  document.querySelector("form").addEventListener("submit", formSubmissionHandler);
}

function formSubmissionHandler(event) {
  event.preventDefault();
  const searchParameters = document.getElementById("search").value;
  console.log(`Search parameter is: ${searchParameters}`);
  document.getElementById("search").value = null;
  getSearchResults(searchParameters);
}

function getSearchResults(searchString) {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/stickers/search?q=${searchString}&api_key=${process.env.API_KEY}`;

  request.addEventListener("loadend", function () {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response);
    }
  });

  request.open("GET", url, true);
  request.send();
}

function printElements(apiResponse) {
  let printToHtml = "";
  for (let i = 0; i < apiResponse.data.length; i++) {
    printToHtml += `<img src=${apiResponse.data[i].images.fixed_height.webp}>`;
  }
  document.getElementById("results").innerHTML = printToHtml;
}
