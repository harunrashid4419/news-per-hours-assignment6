
const loadCategory = async (categories) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/${categories}`;
        const res = await fetch(url);
        const data = await res.json();
        displayCategory(data.data.news_category);
    }
    catch(error){
        console.log(error);
    }
};
loadCategory('categories');


const displayCategory = categorys => {
    const categoryContainer = document.getElementById('category-section');
    categorys.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('navbar-nav');
        categoryDiv.innerHTML = `
            <a onclick = "loadNews('${category.category_id}'), toggleSpinners(true)" class="nav-link active px-4" aria-current="page" href="#">${category.category_name ? category.category_name : 'Not Available'}</a>
        `;
        categoryContainer.appendChild(categoryDiv);
    })
};



const loadNews = async (category_id) => {
    try{
        fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
        .then(res => res.json())
        .then(data => displayNews(data.data))
    }
    catch(error){
        console.log(error);
    }
};

loadNews('08');

let countNews = (displayNews) =>{
    let newsPostCount = displayNews.length;
    console.log(newsPostCount);
}
countNews();

const displayNews = allNews => {
    const newsCategory = document.getElementById('news-category');
    newsCategory.innerHTML = '';
    allNews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('row')
        newsDiv.innerHTML = `
            <div class = "col-sm-12 col-lg-3 col-md-3">
                <img class="rounded mb-4" src = "${news.thumbnail_url ? news.thumbnail_url : 'No data available'}">
            </div>
            <div class = "col-sm-12 col-lg-9 col-md-9 pt-2">
                <h4>${news.title ? news.title : 'No data available'}</h4>
                <p>${news.details.slice(0, 200) + '...'}</p>
                <div class="row">
                    <div class="col-6 d-flex">
                    <img class=" img-fluid w-25 rounded-circle" src = "${news.author.img ? news.author.img: 'No data available'}">
                    <div class ="pt-4">
                        <p class="ps-3 mb-1">${news.author.name ? news.author.name : 'No data available'}</p>
                        <p class="ps-3">${news.author.published_date ? news.author.published_date : 'No data available'}</p>
                    </div>
                    </div>
                    <div class="col-2">
                        <p class ="pt-4 ms-5">${news.total_view ? news.total_view : 'No data available'}</p>
                    </div>
                    <div class="col-4">
                        <button onclick = "showDetails('${news._id}')" class="btn btn-primary mt-4 ms-5" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                    </div>
                </div>
            </div>
        `;
        newsCategory.appendChild(newsDiv);
    });
    toggleSpinners(false);
}






const showDetails = (news_id) => {
    try{
        fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
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
    modalTitle.innerText = `${allNews.author.name ? allNews.author.name : 'No author name available'}`;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
       <img class = "img-fluid" src = "${allNews.image_url}">
       <div class="d-flex">
       <p class ="pt-3">Rating: ${allNews.rating.number}</p>
       <p class ="pt-3 ps-5">badge: ${allNews.rating.badge}</p>
       </div>
    `;
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




