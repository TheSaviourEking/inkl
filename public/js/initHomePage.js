document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const header = document.createElement('header');
    const main = document.createElement('main');
    const footer = document.createElement('footer');
    body.appendChild(header);
    body.appendChild(main);
    body.appendChild(footer);

    Nav();
    Hero();
    WhyUs();
    // News();
})
