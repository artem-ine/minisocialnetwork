import React from "react";

const Home = () => {
  fetch("http://localhost:1337/api/users")
    .then((response) => response.json())
    .then((data) => {
      displayUserData(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  function displayUserData(data) {
    const userContainer = document.getElementById("user-container");
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

  return (
    <>
      <div id="user-container"></div>
    </>
  );
};

export default Home;
