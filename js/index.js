const loadAllnews = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/news/categories")
    const data = await res.json()
    return data.data.news_category;
}

const setAllCategories = async () => {
    const allCategories = await loadAllnews();
    const categories = document.getElementById('categories');
    for (const category of allCategories) {
        // console.log(category);
        const li = document.createElement('li');
        li.innerHTML = `<a onclick="loadCategory()">${category.category_name}</a>`;
        categories.appendChild(li);
    }
}

const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/category/08`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.data[0].category_id)
}


setAllCategories();