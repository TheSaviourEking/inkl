const WhyUs = () => {
    const section = document.createElement('section');
    const h2 = document.createElement('h2');
    h2.innerText = 'Why Us';
    
    section.appendChild(h2);
    const main = document.getElementsByTagName('main')[0];
    main.appendChild(section);
}
