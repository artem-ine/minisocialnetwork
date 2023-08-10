import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// Using the fetch API
fetch("http://localhost:1337/api/users")
  .then((response) => response.json())
  .then((data) => {
    // Call a function to display the data in the app
    displayUserData(data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

function displayUserData(data) {
  const userContainer = document.getElementById("user-container"); // Change this to the actual ID of your container element

  // Loop through the data and create HTML elements to display each user's information
  data.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.innerHTML = `
      <h2>${user.username}</h2>
      <p>Email: ${user.email}</p>
      <p>Provider: ${user.provider}</p>
      <p>Confirmed: ${user.confirmed ? "Yes" : "No"}</p>
      <!-- Add more fields as needed -->
    `;
    userContainer.appendChild(userDiv);
  });
}

function App() {
  return <div id="user-container"></div>;
}

export default App;
