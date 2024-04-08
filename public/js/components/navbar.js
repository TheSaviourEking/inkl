const Nav = () => {
    const nav = document.createElement('nav');
    const div = document.createElement('div');
    const span = document.createElement('span');

    const img = document.createElement('img');
    const homeLink = document.createElement('a');
    homeLink.setAttribute('href', '/');
    span.setAttribute('id', 'logo');
    img.src = '/images/android-chrome-512x512.png';

    span.appendChild(img);
    homeLink.appendChild(span)

    const input = document.createElement('input');
    input.placeholder = 'hehe';
    input.autocomplete = true;
    const ul = document.createElement('ul');
    ul.setAttribute('class', 'flex');
    const actions = [
        {
            action: 'signup',
            path: '/signup'
        },
        {
            action: 'login',
            path: '/login'
        }
    ];
    let link = '';
    for (let i = 0; i < actions.length; i++) {
        link += `<li><a class=cta href=${actions[i].path}>${actions[i].action}</a></li>`
    }
    const user = null;
    ul.innerHTML = user ? user : link;
    div.setAttribute('class', 'flex');
    div.appendChild(input);
    div.appendChild(ul)

    nav.setAttribute('class', 'flex');
    nav.appendChild(homeLink);
    nav.appendChild(div);

    const container = document.createElement('div');
    container.appendChild(nav);

    const header = document.getElementsByTagName('header')[0];
    header.appendChild(container);
}
