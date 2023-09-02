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

  content = data.data;

  const contentContainer = document.getElementById("content-container");
  contentContainer.innerHTML = ``;

  const showContent = () => {
    content.forEach((card) => {
      const contentCard = document.createElement("div");

      contentCard.classList = ``;
      contentCard.innerHTML = `
      <div class="mt-2 card">
  <div class="relative">
    <img
      src="${card.thumbnail}"
      alt=""
      class="rounded-lg w-[312px] h-[200px]"
    />

    <p
      class="absolute bg-black text-white text-[10px] right-[20%] md:right-0 lg:right-0 bottom-0 rounded-sm"
    >
      ${card.others.posted_date ? timeConversion(card.others.posted_date) : ""}
    </p>
  </div>
  <div class="flex gap-3 mt-5">
    <img
      src="${card.authors[0].profile_picture}"
      alt=""
      class="w-8 h-8 rounded-full"
    />

    <div>
      <h1 class="font-bold text-black">${card.title}</h1>

      <div class="flex items-center gap-4">
        <p class="my-2 text-[#171717B2] text-sm">
          ${card.authors[0].profile_name}
        </p>

        <img src="${card.authors[0].verified ? "images/blueTick.png" : ""}"
        class="w-4 h-4 ">
      </div>

      <p class="text-[#171717B2] font-sm mt-2">${card.others.views} views</p>
    </div>
  </div>
</div>
      `;

      contentContainer.appendChild(contentCard);
    });
  };

  if (Object.keys(content).length === 0) {
    const emptyContent = document.createElement("div");
    emptyContent.classList = `lg:col-span-4`;
    emptyContent.innerHTML = `
    <div class="flex flex-col items-center justify-center w-full p-16 m-auto">
    <img src="images/Icon.png" alt="" />
    <p class="mt-4 text-3xl font-bold text-center text-black">
      Oops!! Sorry, There is no content here
    </p>
    </div>
  `;

    contentContainer.appendChild(emptyContent);
  } else {
    showContent();

    document.getElementById("sort-btn").addEventListener("click", () => {
      contentContainer.innerHTML = "";

      content.sort((a, b) => {
        const aView = parseFloat(a.others.views);
        const bView = parseFloat(b.others.views);

        return bView - aView;
      });
      showContent();
    });
  }
};

const timeConversion = (secondsTime) => {
  const hourTime = parseInt(secondsTime / 3600);
  const remainedTime = parseInt(secondsTime % 3600);
  const minuteTime = parseInt(remainedTime / 60);

  return `${hourTime}hrs ${minuteTime} min ago`;
};

document.getElementById("blog-btn").addEventListener("click", () => {
  window.location.href = "../blog.html";
});

handleCategoryBtn();
handleCategoryContent(1000);
