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
    for (category of categoriesData) {
        console.log(category);
        const div = document.createElement('div');
        div.innerHTML = `
        <h1>hello</h1>
        `;
    }
    categoryNews.appendChild(div);
}

setAllCategories();