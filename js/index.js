const loadAllnews = async () => {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/news/categories")
        const data = await res.json()
        return data.data.news_category;
    }
    catch (error) {
        console.log(error);
    }
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

    // spinner
    const spinner = document.createElement('spinner');
    spinner.classList.remove("hidden");

    const url = `https://openapi.programming-hero.com/api/news/category/${categories}`
    const res = await fetch(url)
    const data = await res.json()
    const categoriesData = data.data;
    console.log(categoriesData);

    const categoryNews = document.getElementById('category-news');
    categoryNews.textContent = "";
    const notFound = document.getElementById('not-found');
    notFound.textContent = "";

    if (categoriesData.length === 0) {
        notFound.innerHTML = `<h3 class="text-3xl text-amber-400 text-center mt-20">No News Found...!!</h3>`;
        return;
    }
    else {
        notFound.innerHTML = `<h3 class="text-2xl text-emerald-600 text-center mt-10">${categoriesData.length} News Items Found</h3>`;
    }

    spinner.classList.add("hidden");

    for (category of categoriesData) {
        // console.log(category);
        const { _id, total_view, title, author, thumbnail_url, details } = category;
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card lg:card-side bg-base-100 shadow-xl m-5">
                <figure><img class="w-full" src="${thumbnail_url}" alt=""></figure>
                <div class="card-body w-full">
                    <h2 class="card-title">${title}</h2>
                    <p>${details.length > 400 ? details.slice(0, 400) + " ..." : details}</p>
                    <div class="card-actions justify-between">
                        <div class="flex">
                            <div class="my-auto mr-3">
                                <img class="w-10 h-10 rounded-full" src="${author.img}" alt="">
                            </div>
                            <div>
                                <h3>${author.name ? author.name : "Author not found"}</h3>
                                <p>${author.published_date}</p>
                            </div>
                        </div>
                        <h3> <i class="fa-regular fa-eye"></i> ${total_view ? total_view + "M" : "No views yet"}</h3>
                        <label for="my-modal-3" onclick="showModal('${_id}')" class="btn modal-button">Details</label>
                    </div>
                </div>
            </div>
        `;
        categoryNews.appendChild(div);
    };


}

const showModal = async (_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${_id}`
    const res = await fetch(url)
    const data = await res.json();
    const categoriesNews = data.data;

    const modalBody = document.getElementById('modal-body');
    modalBody.textContent = "";
    for (news of categoriesNews) {
        const div = document.createElement('div');
        div.innerHTML = `
        <img src="${news.image_url}" alt="">
        <p class="py-4">${news.details}</p>
        `;
        modalBody.appendChild(div);
    }
}

setAllCategories();