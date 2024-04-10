const Hero = () => {
    const section = document.createElement('section');
    const heroContent = document.createElement('div');
    const h1 = document.createElement('h1');
    const h2 = document.createElement('h2');
    const a = document.createElement('a');

    h1.innerText = 'Never miss what matters';
    h2.innerText = 'Stay informed with curated headlines';
    a.innerText = 'Start your personalized news journey';
    a.setAttribute('href', '/signup');
    a.setAttribute('class', 'cta');

    heroContent.classList.add('hero-content');
    heroContent.classList.add('flex');
    heroContent.appendChild(h1);
    heroContent.appendChild(h2);
    heroContent.appendChild(a);

    section.appendChild(heroContent)

    const header = document.getElementsByTagName('header')[0];
    header.appendChild(section);
}
