const handleCategoryBtn = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await response.json();
  const categories = data.data;

  const categoryContainer = document.getElementById("category-container");

  categories.forEach((category) => {
    const categoryBtn = document.createElement("button");

    categoryBtn.classList = `btn btn-accent capitalize active:btn-error`;

    categoryBtn.textContent = category.category;

    categoryContainer.appendChild(categoryBtn);
  });
};

handleCategoryBtn();
