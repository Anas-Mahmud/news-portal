const loadAllnews = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/news/categories")
    const data = await res.json()
    return data.data.news_category;
}

const setAllCategories = async () => {
    const allCategories = await loadAllnews();
    const categories = document.getElementById('categories');
    for (const category of allCategories) {
        const li = document.createElement('li');
        li.innerHTML = `<a>${category.category_name}</a>`;
        categories.appendChild(li);
    }
}

setAllCategories();