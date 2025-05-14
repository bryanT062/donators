const sectionElement = document.querySelector(".contener");

fetch("https://randomuser.me/api/?results=50")
  .then((response) => {
    return response.json()
})
  
  .then((json) => {
    console.log(json);
    const resultsArray = json.results;

    for (const user of resultsArray) {
        const fullName = user.name.first  +  user.name.last;
        const country = user.country + user.state;
        const picture = user.picture.medium;
        const phone = user.cell;
      const divElement = document.createElement("div");
      sectionElement.appendChild(divElement);
      divElement.classList.toggle("active");
      divElement.innerHTML =`
          <img src="${picture}">
         <p><strong>${fullName}</strong> </p>
         <p><strong>${country}</strong> </p>
         <p><strong>${phone}</strong> </p>
         
         `
    
    }
  });