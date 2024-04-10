const News = async () => {
    const section = document.createElement('section');
    const cardsDiv = document.createElement('div');
    const buttonsDiv = document.createElement('div');

    cardsDiv.setAttribute('class', 'cards');
    cardsDiv.classList.add('flex');
    buttonsDiv.setAttribute('class', 'cta');
    section.appendChild(cardsDiv);
    section.appendChild(buttonsDiv);
    const main = document.getElementsByTagName('main')[0];
    main.appendChild(section);
    createNewsCard();
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
/*
<div class="card">
  <img src="card-image.jpg" alt="Card Image">
  <div class="card-content">
    <h3 class="card-title">Card Title</h3>
    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut justo nec turpis aliquet rhoncus.</p>
    <a href="#" class="btn">Learn More</a>
  </div>
</div>
*/
const createNewsCard = async () => {
    const news = await getNews('/js/data.json')
    console.log(news.data[0]);

    let string = '';
    for (let i = 0; i < news.data.length; i++) {
        const newsData = news.data[i];
        string += `<div class='card'>
            <img src=${newsData.image_url} alt='Card Image'>
            <div class='card-content'>
                <h3 class='card-title'>${newsData.title}</h3>
                <p class='card-text'>${newsData.description}</p>
            </div>
        </div>`;
    }
    const cards = document.querySelector('main').childNodes[1].childNodes[0];
    cards.innerHTML = string;
    // console.log(cards)
    // const rootStyles = getComputedStyle(document.documentElement);
    // document.documentElement.setAttribute('class', 'theme-dark')
    // console.log(rootStyles)
}
