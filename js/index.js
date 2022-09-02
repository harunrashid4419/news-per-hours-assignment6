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

const loadNews = () =>{
    fetch(`https://openapi.programming-hero.com/api/news/category/01`)
        .then(res => res.json())
        .then(data => displayNews(data.data))
};

const displayNews = allNews =>{
    const newsCategory = document.getElementById('news-category');
    allNews.forEach(news =>{
        console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('d-flex');
        newsDiv.innerHTML = `
            <div>
                <img class="rounded mb-4" src = "${news.thumbnail_url}">
            </div>
            <div class = "ps-5">
                <h4>${news.title}</h4>
                <p>${news.details.slice(0, 200) + '...'}</p>
                    <div class="row">
                        <div class="col d-flex">
                            <img class="rounded-circle w-25" src = "${news.author.img}">
                            <div class ="pt-2">
                                <p class="ps-3 mb-1">${news.author.name}</p>
                                <p class="ps-3">${news.author.published_date}</p>
                            </div>
                        </div>
                        <div class="col">
                            <h3 class ="pt-3 ms-5">${news.total_view}</h3>
                        </div>
                        <div class="col">
                            <button onclick = "showDetails()" class="btn btn-primary mt-3 ms-5">Details</button>
                        </div>
                        </div>
            </div>
        `;
        newsCategory.appendChild(newsDiv);
    })
};

loadNews();