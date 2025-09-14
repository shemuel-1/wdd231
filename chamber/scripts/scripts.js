// ******************** NAVIGATION *********************

const navButton = document.getElementById("ham-button");
const navMenu = document.getElementById("nav-bar");

navButton.addEventListener("click", () => {
    navButton.classList.toggle("show");
    navMenu.classList.toggle("show");
});


async function displayBusinessCards() {
  try {
    const response = await fetch('data/members.json');
    const members = await response.json();
    const businessesSection = document.getElementById('businesses');
    businessesSection.innerHTML = "";

    members.forEach(member => {
      // Create card container
      const card = document.createElement('div');
      card.classList.add('business-card');
      
      const layoutBtn = document.getElementById("layout");
      layoutBtn.addEventListener("click", () => {
        businessesSection.classList.toggle("list");
      });
      

      // Fill card with member info 
        card.innerHTML = `
        <img src="${member.image}" alt="${member.name} image" loading="lazy" width="280">
        <h3>${member.name}</h3>
        <p><strong>Address: </strong>${member.address}</p>
        <p><strong>Phone: </strong>${member.phone}</p>
        <p><strong>Industry: </strong>${member.industry}</p>
        <p><a href="${member.website}" target="_blank">Website</a></p>
      `;

      // Add card to section
      businessesSection.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading business cards:', error);
  }
}

displayBusinessCards();


const listButton = document.getElementById("layout");

listButton.addEventListener("click", () => {
    const businesses = document.querySelectorAll(".business-card");

    businesses.forEach(business => {
        business.classList.toggle("list");
    });
});