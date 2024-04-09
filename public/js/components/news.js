const News = async () => {
    const section = document.createElement('section');
    const cardsDiv = document.createElement('div');
    const buttonsDiv = document.createElement('div');

    const main = document.getElementsByTagName('main')[0];
    main.appendChild(section);

    // const news = await getNews('/js/data.json');
    // console.log(news.data)
    // news.data.forEach(createNewsCard);
    // div.innerHTML = news;
    createNewsCard()
    // section.appendChild(div);
}

const getNews = async (path) => {
    const res = await fetch(path);
    if (res.ok) return res.json();
    try {
        const err = await res.json();
        const li = document.createElement("li");
        const errorMessage = document.createTextNode(err.message);
        li.appendChild(errorMessage);
        ul.appendChild(li);
    } catch (res) {
        throw res;
    }
}

const createNewsCard = async () => {
    // const card = document.createElement('div');
    // card.setAttribute('class', 'card');
    const news = await getNews('/js/data.json')


    let string = '';
    for (let i = 0; i < news.data.length; i++) {
        // const card = document.createElement('div');
        // card.setAttribute('class', 'card');
        string += `<div class='card'>${news.data[i].title}</div>`;
    }
    const section = document.querySelector('main').childNodes[1];
    section.innerHTML = string;
}
