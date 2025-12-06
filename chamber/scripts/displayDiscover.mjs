import { discoverItems } from "../data/discover-items.mjs";

const main = document.querySelector('main#homeMain') || document.querySelector('main');

function daysBetween(msA, msB) {
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.floor((msA - msB) / msPerDay);
}

function showVisitMessage() {
    const key = 'discover-last-visit';
    const now = Date.now();
    const last = localStorage.getItem(key);
    const wrapper = document.createElement('div');
    wrapper.className = 'visit-message';

    if (!last) {
        wrapper.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
        const lastMs = parseInt(last, 10);
        const days = daysBetween(now, lastMs);
        if (days < 1) {
            wrapper.textContent = 'Back so soon! Awesome!';
        } else if (days === 1) {
            wrapper.textContent = 'You last visited 1 day ago.';
        } else {
            wrapper.textContent = `You last visited ${days} days ago.`;
        }
    }

    localStorage.setItem(key, String(now));
    return wrapper;
}

function buildCards(items) {
    const grid = document.createElement('section');
    grid.className = 'discover-grid';

    items.forEach((item, idx) => {
        const card = document.createElement('article');
        card.className = 'card';
        const area = `card${idx + 1}`;
        card.setAttribute('data-area', area);

        const h2 = document.createElement('h2');
        h2.textContent = item.name;

        const fig = document.createElement('figure');
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        fig.appendChild(img);

        const addr = document.createElement('address');
        addr.textContent = item.address;

        const p = document.createElement('p');
        p.textContent = item.description;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = 'Learn more';
        btn.addEventListener('click', () => {
            alert(item.name + "\n" + item.address + "\n\n" + item.description);
        });

        card.append(h2, fig, addr, p, btn);
        grid.appendChild(card);
    });

    return grid;
}

function init() {
    if (!main) return;
    const visit = showVisitMessage();
    const grid = buildCards(discoverItems);
    main.innerHTML = '';
    main.classList.add('discover-main');
    main.appendChild(visit);
    main.appendChild(grid);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
