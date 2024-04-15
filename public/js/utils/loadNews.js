document.addEventListener('DOMContentLoaded', () => {
    getNews();
})

const getNewsDataio = () => {
    console.log('news data')
}

const newsCards = document.getElementsByClassName('cards')[0];
/* NEWS URL's */
// GNEWS API_KEY 3fcf876196aa4ef556f043e23e6dc86c

const NEWS_APIS = {
    gnewsIo: '/js/dataGnews.json',
    theNewsApi: '/js/data.json'
};

const loggedIn = false;
const getNews = () => {
    getNewsData('/js/dataGnews.json');
}

const getNewsData = async (source) => {
    let newsData = null;
    try {
        switch (source) {
            case ('/js/dataGnews.json'):
                const res = await fetch('/js/dataGnews.json');
                if (res.ok) {
                    const data = await res.json();
                    console.log('data---', data.articles)
                    // newsData = data['articles'];
                    newsData = data.articles;
                    break;
                }
            // fallback api
            // used when api trials for the above api is exhausted
            case ('/js/data.json'):
                const res2 = await (fetch('/js/data.json'));
                if (res2.ok) {
                    const data = await res2.json();
                    newsData = data.data;
                    console.log('data2', data)
                    break;
                }
        }
    } catch (err) {
        console.error(err);
    } finally {
        displayNews(source, newsData);
    }
}

const displayNews = (source, newsData) => {
    let string = '';
    let totalDisplay = 3;
    if (loggedIn) {
        totalDisplay = newsData.length;
    }

    console.log(loggedIn, totalDisplay);
    const indexes = [];
    for (let data = 0; data < totalDisplay; data++) {
        let newsIndex = parseInt(Math.random() * newsData.length);
        while (true) {
            if (indexes.indexOf(newsIndex) !== -1) {
                newsIndex = parseInt(Math.random() * newsData.length);
            } else {
                break;
            }
        }
        indexes.push(newsIndex);
    }
    console.log(indexes)

    for (let news = 0; news < indexes.length; news++) {
        const data = newsData;
        const randomNews = data[indexes[news]];
        // console.log(randomNews)
        string += `
                <a href=${randomNews.url}>
                    <div class="card">
                        <div class="card-image">
                            <img src=${randomNews.image} alt="">
                        </div>
                        <div class="card-content">
                            <h3>${randomNews.title}</h3> 
                            <p>${randomNews.description}</p>
                            <span>${randomNews.publishedAt}</span> 
                            <span><a href=${randomNews.source.url}>${randomNews.source.url}</a></span>              
                        </div>
                    </div>
                </a>
            `;
    }
    // console.log(string)
    newsCards.innerHTML = string;
}
