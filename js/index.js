const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
};

const displayCategory = categorys => {
    const categoryContainer = document.getElementById('category-section');
    categorys.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('navbar-nav');
        categoryDiv.innerHTML = `
            <a class="nav-link active px-4" aria-current="page" href="#">${category.category_name}</a>
        `;
        categoryContainer.appendChild(categoryDiv);
    })
};

loadCategory();

const loadNews = async() => {
    fetch(`https://openapi.programming-hero.com/api/news/category/01`)
        .then(res => res.json())
        .then(data => displayNews(data.data))
};

const displayNews = allNews =>{
    const newsCategory = document.getElementById('news-category');
    allNews.forEach(news =>{
        console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('row')
        newsDiv.innerHTML = `
            <div class = "col-sm-12 col-lg-3 col-md-3">
                <img class="rounded mb-4" src = "${news.thumbnail_url}">
            </div>
            <div class = "col-sm-12 col-lg-9 col-md-9 pt-2">
                <h4>${news.title}</h4>
                <p>${news.details.slice(0, 200) + '...'}</p>
                <div class="row">
                    <div class="col-6 d-flex">
                    <img class=" img-fluid w-25 rounded-circle" src = "${news.author.img}">
                    <div class ="pt-2">
                        <p class="ps-3 mb-1">${news.author.name}</p>
                        <p class="ps-3">${news.author.published_date}</p>
                    </div>
                    </div>
                    <div class="col-2">
                        <h3 class ="pt-3 ms-5">${news.total_view}</h3>
                    </div>
                    <div class="col-4">
                        <button onclick = "showDetails()" class="btn btn-primary mt-3 ms-5" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                    </div>
                </div>
            </div>
        `;
        newsCategory.appendChild(newsDiv);
    })
}


// const displayNews = allNews => {
//     const newsCategory = document.getElementById('news-category');
//     allNews.forEach(news => {
//         console.log(news);
//         const newsDiv = document.createElement('div');
//         newsDiv.classList.add('row g-2');
//         newsDiv.innerHTML = `
//             <div class="col-12 col-lg-4 col-md-4 col-sm-4">
//                 <img class="rounded mb-4" src = "${news.thumbnail_url}">
//             </div>
//             <div class = "ps-5 pt-5 col-12 col-lg-4 col-md-4 col-sm-4">
//                 <h4>${news.title}</h4>
//                 <p>${news.details.slice(0, 200) + '...'}</p>
//                     <div class="row">
//                         <div class="col d-flex">
//                             <img class=" img-fluid w-25 rounded-circle" src = "${news.author.img}">
//                             <div class ="pt-2">
//                                 <p class="ps-3 mb-1">${news.author.name}</p>
//                                 <p class="ps-3">${news.author.published_date}</p>
//                             </div>
//                         </div>
//                         <div class="col">
//                             <h3 class ="pt-3 ms-5">${news.total_view}</h3>
//                         </div>
//                         <div class="col">
//                             <button onclick = "showDetails()" class="btn btn-primary mt-3 ms-5" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
//                         </div>
//                         </div>
                        
//             </div>
//         `;
//         newsCategory.appendChild(newsDiv);
//     })
// };

const showDetails = () =>{
    fetch(`https://openapi.programming-hero.com/api/news/category/01`)
        .then(res => res.json())
        .then(data => details(data.data))
}

const details = allNews =>{
    allNews.map(news =>{
        const modalTitle = document.getElementById('modal-title');
        modalTitle.innerText = `${news.category_id}`
    })
}

loadNews();


