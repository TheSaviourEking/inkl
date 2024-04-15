document.addEventListener('DOMContentLoaded', async () => {
    const cards = document.getElementsByClassName('cards')[0];
    try {
        let newsData = null;
        //https://newsdata.io/api/1/news?apikey=pub_40686a22623095f12b263dad6a86446fb34ee
        // const res = await fetch('/js/data.json');
        const API_KEY = 'pub_40686a22623095f12b263dad6a86446fb34ee';
        const rootUrl = "https://newsdata.io/api/1/news";
        const options = {
            apikey: API_KEY
        };
        const qs = new URLSearchParams(options);
        const url = `${rootUrl}?${qs.toString()}`;
        // const res = await fetch(url);
        const res = await fetch('/js/data.json');;
        if (res.ok) {
            newsData = await res.json();
        }
        let string = '';
        // newsData.data.forEach(news => {
        //     string += `<div class="card">
        //                     <div class="card-img">
        //                         <img src="${news.image_url}" alt="" srcset="">
        //                     </div>
        //                     <div class="card-content">
        //                         ${news.title.toUpperCase()}\n
        //                         <a href="http://${news.url}">
        //                             ${news.snippet}
        //                         </a>
        //                     </div>
        //              </div>`;
        // })
        for (let i = 0; i < 3; i++) {
            const news = newsData.data[i];
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
        }
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
