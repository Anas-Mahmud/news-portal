const loadAllnews = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/news/categories")
    const data = await res.json()
    return data.data.news_category;
}

const setAllCategories = async () => {
    const allCategories = await loadAllnews();
    const categories = document.getElementById('categories');
    for (const categoryId of allCategories) {
        // console.log(categoryId);
        const li = document.createElement('li');
        li.innerHTML = `<a onclick="loadCategory('${categoryId.category_id}')">${categoryId.category_name}</a>`;
        categories.appendChild(li);
        // console.log(categoryId.category_id);
    }
}

const loadCategory = async (categories) => {
    // console.log(categories);
    const url = `https://openapi.programming-hero.com/api/news/category/${categories}`
    const res = await fetch(url)
    const data = await res.json()
    const categoriesData = data.data;
    // console.log(categoriesData);

    const categoryNews = document.getElementById('category-news');
    categoryNews.textContent = "";
    for (category of categoriesData) {
        console.log(category);
        const { _id, rating, total_view, title, author, thumbnail_url, details } = category;
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card card-side bg-base-100 shadow-xl m-5">
                <figure><img class="w-full" src="${thumbnail_url}" alt=""></figure>
                <div class="card-body w-full">
                    <h2 class="card-title">${title}</h2>
                    <p>${details.length > 400 ? details.slice(0, 400) + " ..." : details}</p>
                    <div class="card-actions justify-end">
                        <i class="fa-solid fa-angles-right"></i>
                    </div>
                </div>
            </div>

        `;
        categoryNews.appendChild(div);
    };

}

setAllCategories();