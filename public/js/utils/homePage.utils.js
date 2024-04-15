document.addEventListener('DOMContentLoaded', () => {
    const heroVideo = document.querySelector('video#heroVideo');
    // const prevBtn = document.getElementById('prev');
    // const nextBtn = document.getElementById('next');

    const readMore = document.getElementById('readMore');
    // prevBtn.addEventListener('click', (event) => {
    //     //  https://newsdata.io/api/1/news?apikey=pub_40686a22623095f12b263dad6a86446fb34ee
    //     // console.log(event.target)
    //     // API Token: YL0zgvrWx4MZbFZ54kIYLbjXxR9vrMdukrdcy0X6
    // })

    // nextBtn.addEventListener('click', (event) => {
    //     console.log(event.target)
    // })

    const modal = document.getElementById('modal');
    const close = document.getElementsByClassName('close')[0];
    // console.log(readMore);
    readMore.addEventListener('click', (event) => {
        modal.style.display = 'block';
    })
    close.addEventListener('click', () => {
        modal.style.display = 'none';
    })
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none'
        }
    })

    const getNewsLink = document.getElementById('getNews');
    getNewsLink.addEventListener('click', event => {
        event.preventDefault();
        getNewsDataio();
    })
})
