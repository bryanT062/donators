const sectionElement = document.querySelector(".contener");
let resultsArray;

fetch("https://randomuser.me/api/?results=50")
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    resultsArray = json.results.map((user) => {
      user.donationAmount = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
      return user;
    });

    afficheur(resultsArray);
  });

function afficheur(users) {
  sectionElement.innerHTML = "";

  for (const user of users) {
    const fullName = user.name.first + " " + user.name.last;
    const country = user.location.country + "   " + user.location.state;
    const picture = user.picture.large;
    const phone = user.phone;
    const divElement = document.createElement("div");
    sectionElement.appendChild(divElement);
    divElement.classList.toggle("active");
    divElement.innerHTML = `
      <div>
         <p class="argent"><strong>${user.donationAmount}€</strong></p>
         <img src="${picture}">
         <p><strong>${fullName}</strong></p>
         <p><strong>${country}</strong></p>
         <p><strong>${phone}</strong></p>
      </div>
    `;
  }
}

function recherche(a) {
  let resultatsFiltres = [];

  if (a === "all") {
    resultatsFiltres = resultsArray;
  } else if (a === "male") {
    resultatsFiltres = resultsArray.filter((user) => user.gender === "male");
  } else if (a === "female") {
    resultatsFiltres = resultsArray.filter((user) => user.gender === "female");
  } else if (a === "order") {
    resultatsFiltres = [...resultsArray].sort((a, b) =>
      a.name.first.localeCompare(b.name.first)
    );
  } else if (a === "donated") {
    resultatsFiltres = [...resultsArray].sort(
      (a, b) => b.donationAmount - a.donationAmount
    );
  }

  afficheur(resultatsFiltres);
}
