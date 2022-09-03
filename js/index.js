const loadCategory = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();
        displayCategory(data.data.news_category);
    }
    catch(error){
        console.log(error);
    }
};

const displayCategory = categorys => {
    const categoryContainer = document.getElementById('category-section');
    categorys.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('navbar-nav');
        categoryDiv.innerHTML = `
            <a onclick = "loadNews('${category.category_id}'), toggleSpinners(true)" class="nav-link active px-4" aria-current="page" href="#">${category.category_name}</a>
        `;
        categoryContainer.appendChild(categoryDiv);
    })
};

loadCategory();

const loadNews = async () => {
    try{
        fetch(`https://openapi.programming-hero.com/api/news/category/08`)
        .then(res => res.json())
        .then(data => displayNews(data.data))
    }
    catch(error){
        console.log(error);
    }
};

const displayNews = allNews => {
    const newsCategory = document.getElementById('news-category');
    allNews.forEach(news => {
        // console.log(news);
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
                    <div class ="pt-4">
                        <p class="ps-3 mb-1">${news.author.name ? news.author.name : 'No author name available'}</p>
                        <p class="ps-3">${news.author.published_date ? news.author.published_date : 'No published data available'}</p>
                    </div>
                    </div>
                    <div class="col-2">
                        <p class ="pt-5 ms-5">${news.total_view ? news.total_view : 'No view information'}</p>
                    </div>
                    <div class="col-4">
                        <button onclick = "showDetails()" class="btn btn-primary mt-4 ms-5" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                    </div>
                </div>
            </div>
        `;
        newsCategory.appendChild(newsDiv);
    });
    toggleSpinners(false);
}



const showDetails = () => {
    try{
        fetch(`https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a`)
        .then(res => res.json())
        .then(data => details(data.data[0]))
    }
    catch(error){
        console.log(error);
    }
}

const details = allNews => {
    console.log(allNews)
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = `${allNews.author.name}`;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
       <img class = "img-fluid" src = "${allNews.image_url}">
    `
}

const toggleSpinners = isLoad =>{
    const spinners = document.getElementById('spinners');
    if(isLoad){
        spinners.classList.remove('d-none');
    }
    else{
        spinners.classList.add('d-none');
    }
}

loadNews();


