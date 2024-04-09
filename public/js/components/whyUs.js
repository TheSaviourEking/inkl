const WhyUs = () => {
    const section = document.createElement('section');
    const h2 = document.createElement('h2');
    h2.innerText = 'Why Us';

    const cards = document.createElement('div');
    cards.setAttribute('class', 'cards');
    cards.classList.add('flex')

    const cardsContent = [
        "Never miss what's important",
        "Save Time, Read More",
        "Stay Informed, stay curious",
        "Read with confidence"
    ];
    let string = '';
    for (let i = 0; i < cardsContent.length; i++) {
        string += `<div class='card'>${cardsContent[i]}</div>`
    }
    cards.innerHTML += string;

    const cta = document.createElement('a');
    cta.setAttribute('href', '/signup');
    cta.setAttribute('class', 'cta');
    cta.innerText = 'Sign up for free today'

    section.appendChild(h2);
    section.appendChild(cards);
    section.appendChild(cta)
    const main = document.getElementsByTagName('main')[0];
    main.appendChild(section);
}
