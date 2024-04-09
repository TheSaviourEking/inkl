const Hero = () => {
    const section = document.createElement('section');
    const h1 = document.createElement('h1');
    const h2 = document.createElement('h2');
    const a = document.createElement('a');

    h1.innerText = 'Never miss what matters';
    h2.innerText = 'Stay informed with curated headlines';
    a.innerText = 'Start your personalized news journey';
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
