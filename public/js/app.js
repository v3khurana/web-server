console.log("Client side javascript file is loaded");

fetch("http://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#data");
const messageTwo = document.querySelector("#error");

weatherForm.addEventListener("submit", (event) => {
  //This is to prevent default behavior of page refresh when button is clicked
  event.preventDefault();
  console.log(searchElement.value);

  const url = "http://localhost:3000/weather?address=" + searchElement.value;
  messageTwo.textContent = "Loading...";
  messageOne.textContent = "";
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return (messageTwo.textContent = "Invalid input");
      }
      //console.log("Latitude of", searchElement.value, "is", data.data.Latitude);
      messageTwo.textContent = "";
      messageOne.textContent =
        "Latitude of " + searchElement.value + " is " + data.data.Latitude;
    });
  });
});
