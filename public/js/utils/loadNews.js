document.addEventListener('DOMContentLoaded', async () => {
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const cards = document.getElementsByClassName('cards')[1];
    try {
        let newsData = null;
        const res = await fetch('/js/data.json');
        if (res.ok) {
            newsData = await res.json();
        }
        let string = '';
        newsData.data.forEach(news => {
            string += `<div class="card">
                            <div class="card-img">
                                <img src="${news.image_url}" alt="" srcset="">
                            </div>
                            <div class="card-content">
                                ${news.title.toUpperCase()}\n
                                <a href="http://${news.url}">
                                    ${news.snippet}
                                </a>
                            </div>
                     </div>`;
        })
        cards.innerHTML = string;
    } catch (err) {
        console.log(err);
    }
})
// const getNews = async () => {
//     const prev = document.getElementById('prev');
//     const next = document.getElementById('next');
//     try {

//     } catch (err) { }
// }
