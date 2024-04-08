const Hero = () => {
    const section = document.createElement('section');
    const h1 = document.createElement('h1');
    const h2 = document.createElement('h2');
    const a = document.createElement('a');

    h1.innerText = 'Here';
    h2.innerText = 'HEREMORSE';
    a.innerText = 'Start Today';
    a.setAttribute('href', '/signup');
    a.setAttribute('class', 'cta');

    // section.style.backgroundImage = '/images/pexels-adam-krypel-6499137.jpg'
    section.setAttribute('class', 'flex');
    section.appendChild(h1);
    section.appendChild(h2);
    section.appendChild(a);

    const header = document.getElementsByTagName('header')[0];
    header.appendChild(section);
}
