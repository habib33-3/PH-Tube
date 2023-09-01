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

    // categoryBtn.textContent = category.category;
    categoryBtn.innerHTML = `
    <div onclick="handleCategoryContent(${category.category_id})">
    ${category.category}
  </div>  
    `;

    categoryContainer.appendChild(categoryBtn);
  });
};

const handleCategoryContent = async (categoryId) => {
  const response = await fetch(
    ` https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();
  const content = data.data;

  // console.log(content);
  const contentContainer = document.getElementById("content-container");

  content.forEach((card) => {
    const contentCard = document.createElement("div");

    contentCard.innerHTML = `
    <div class=" mt-2 relative">
    <img src="${
      card.thumbnail
    }" alt="" class="rounded-lg w-[312px] h-[200px] " />

    <p class="absolute bg-black text-white text-[10px] right-0 bottom-[37%] rounded-sm">${
      card.others.posted_date ? timeConversion(card.others.posted_date) : ""
    }</p>
    <div class="flex mt-5 gap-3">
      <img src="${
        card.authors[0].profile_picture
      }" alt="" class="rounded-full w-8 h-8" />

      <div>
        <h1 class="text-black font-bold">${card.title}</h1>

        <div class="flex items-center gap-4">
          <p class="my-2 text-[#171717B2] text-sm">${
            card.authors[0].profile_name
          }</p>

          <img src="${
            card.authors[0].verified ? "images/blueTick.png" : ""
          }" class="w-4 h-4 ">
        </div>

        <p class="text-[#171717B2] font-sm mt-2">${card.others.views} views</p>
      </div>
    </div>
  </div>
    `;

    contentContainer.appendChild(contentCard);
    console.log(card.authors[0].profile_name);
  });
};

const timeConversion = (secondsTime) => {
  const hourTime = parseInt(secondsTime / 3600);
  const remainedTime = parseInt(secondsTime % 3600);
  const minuteTime = parseInt(remainedTime / 60);

  return `${hourTime}hrs ${minuteTime} min ago`;
};

handleCategoryBtn();
handleCategoryContent(1000);
