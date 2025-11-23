async function displaySpotlight() {
    try {
        const response = await fetch('../chamber/data/members.json');
        const members = await response.json();

        const premiumMembers = members.filter(member => member.membership_level >= 2);


        const shuffled = premiumMembers.sort(() => Math.random() - 0.5);
        const spotlightMembers = shuffled.slice(0, 2);

        const spotlightDiv = document.querySelector('.spotlight');
        if (!spotlightDiv) return; // page doesn't have a spotlight section
        spotlightDiv.innerHTML = '';


        spotlightMembers.forEach(member => {
            const membershipLabel = member.membership_level === 3 ? 'Gold' : 'Silver';

            const spotlightCard = document.createElement('div');
            spotlightCard.classList.add('spotlight-card');
            spotlightCard.innerHTML = `
        <img src="${member.image}" alt="${member.name} logo" loading="lazy">
        <h3>${member.name}</h3>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p class="membership"><strong>Membership:</strong> <span class="badge ${membershipLabel.toLowerCase()}">${membershipLabel}</span></p>
      `;

            spotlightDiv.appendChild(spotlightCard);
        });
    } catch (error) {
        console.error('Error loading spotlight members:', error);
    }
}

displaySpotlight();
