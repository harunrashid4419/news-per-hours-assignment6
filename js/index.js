const loadCategory = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
};

const displayCategory = categorys =>{
    const categoryContainer = document.getElementById('category-section');
    categorys.forEach(category =>{
        // console.log(category);
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('navbar-nav');
        categoryDiv.innerHTML = `
            <a class="nav-link active px-4" aria-current="page" href="#">${category.category_name}</a>
        `;
        categoryContainer.appendChild(categoryDiv);
    })
};

loadCategory();

