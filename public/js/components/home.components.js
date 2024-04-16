// const loggedIn = !!getToken('access-token');

document.addEventListener('DOMContentLoaded', () => {
    if (loggedIn) {
        const header = document.getElementsByTagName('header')[0];
        // const 
        // // header.style.visibility = 'hidden';
        header.classList.add('hidden-element')

        const publicElements = document.querySelectorAll('.public');
        console.log('PUB',publicElements)
        // publicElements.forEach(element => {
        //     element.classList.remove('public');
        //     element.classList.add('hidden');
        // })
        const hiddenElements = document.querySelectorAll('.hidden');
        console.log(hiddenElements)
        // hiddenElements.forEach(element => {
        //     element.classList.remove('hidden');
        //     element.classList.remove('public');
        // });
    }
})
