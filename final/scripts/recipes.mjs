
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('recipes-container');
  const modal = document.getElementById('recipe-modal');
  const modalContent = modal.querySelector('.modal__content');

  if (!grid) return;

  // 1) Load 15 recipes
  loadRecipes();

  async function loadRecipes() {
    grid.innerHTML = '<p>Loading recipes…</p>';
    try {
      // TheMealDB free test key path v1/1; list meals by first letter
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=s');
      const data = await res.json();
      const meals = (data.meals || []).slice(0, 15);

      grid.innerHTML = meals.map(m => `
        <div class="recipe-item" data-id="${m.idMeal}">
          <img src="${m.strMealThumb}/preview" loading="lazy" alt="${escapeHtml(m.strMeal)}">
          <h3>${escapeHtml(m.strMeal)}</h3>
        </div>
      `).join('');
    } catch (err) {
      grid.innerHTML = '<p>Error loading recipes.</p>';
      console.error(err);
    }
  }

  // 2) Open modal with ingredients + instructions
  grid.addEventListener('click', async (e) => {
    const card = e.target.closest('.recipe-item');
    if (!card) return;

    const idMeal = card.dataset.id;
    openModal('<p style="padding:16px;">Loading recipe…</p>');

    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      const data = await res.json();
      const meal = (data.meals && data.meals[0]) ? data.meals[0] : null;

      if (!meal) {
        openModal('<p style="padding:16px;">Recipe not found.</p>');
        return;
      }

      const img = meal.strMealThumb;
      const ingredients = collectIngredients(meal); // [{name, measure}, ...]

      openModal(`
        <h3 id="modal-title" class="modal__title">${escapeHtml(meal.strMeal)}</h3>

        <div class="modal__row">
          <div class="modal__image">
            <img src="${img}" loading="lazy" alt="${escapeHtml(meal.strMeal)}">
          </div>

          <div class="modal__ingredients">
            <h4>Ingredients</h4>
            <ul class="ingredients">
              ${ingredients.map(i => `<li>${escapeHtml(i.measure)} ${escapeHtml(i.name)}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div class="modal__instructions">
          <h4>Instructions</h4>
          <div class="instructions">${escapeHtml((meal.strInstructions || '').trim())}</div>
        </div>
      `);
    } catch (err) {
      console.error(err);
      openModal('<p style="padding:16px;">Failed to load details.</p>');
    }
  });

  // 3) Close modal on backdrop or ×
  modal.addEventListener('click', (e) => {
    if (e.target.dataset.close === 'true') closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Helpers
  function openModal(html) {
    modalContent.innerHTML = html;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('.modal__close').focus();
    document.body.style.overflow = 'hidden';
    }
    
  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.getElementById('discover-btn').focus();
    document.body.style.overflow = '';
    }
    
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function collectIngredients(meal) {
    // TheMealDB uses strIngredient1..20 and strMeasure1..20
    const items = [];
    for (let i = 1; i <= 20; i++) {
      const name = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (name && name.trim()) {
        items.push({ name: name.trim(), measure: (measure || '').trim() });
      }
    }
    return items;
  }
});
