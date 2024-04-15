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
    // const heroVideos = [
    //     // 'https://cdn.discordapp.com/attachments/1229223507532189756/1229223922101391471/736-138808023_medium.mp4?ex=662ee6fc&is=661c71fc&hm=d3b227d153c06e44311f63e651f6ac35c8febc6f65bae6089b0bac7891166be4&',
    //     // // '/assets/video/736-138808023_medium.mp4',
    //     // 'https://cdn.discordapp.com/attachments/1229223507532189756/1229223923313279016/3252974-uhd_3840_2160_25fps.mp4?ex=662ee6fd&is=661c71fd&hm=3b6860dfdea224a48e9ecc7509350fd51444b020a283f53b0f53852c67bb674f&',
    //     // // '/assets/video/3252974-uhd_3840_2160_25fps.mp4',
    //     // 'https://cdn.discordapp.com/attachments/1229223507532189756/1229223924114653254/5359032-hd_1920_1080_30fps.mp4?ex=662ee6fd&is=661c71fd&hm=58eb70144711b9e90df9094f2c3a7d88119b1c0c8e84065ec2ed8d837a3886a7&',
    //     // // '/assets/video/5359032-hd_1920_1080_30fps.mp4',
    //     // 'https://cdn.discordapp.com/attachments/1229223507532189756/1229223924865171567/10159700-hd_1366_720_25fps.mp4?ex=662ee6fd&is=661c71fd&hm=666d7a7b2c291f7ca51c9df5b050d8e27ad3087013630bf8c99d6e2ca240378d&',
    //     // // '/assets/video/10159700-hd_1366_720_25fps.mp4',
    //     // 'https://cdn.discordapp.com/attachments/1229223507532189756/1229223922483069008/3201633-hd_1920_1080_25fps.mp4?ex=662ee6fc&is=661c71fc&hm=0474948fbc2556f1cd502ab49d5882e412a4a452b5a7898fc27a87fe5a7ff01d&',
    //     // '/assets/video/3201633-hd_1920_1080_25fps.mp4'
    // ]
    // let index = 0;
    // function switchVideo() {
    //     const currentSrc = heroVideos[index];
    //     index++;
    //     if (index >= heroVideos.length) {
    //         index = 0;
    //     }
    //     heroVideo.src = currentSrc;
    //     // heroVideo.play();
    // };
    // heroVideo.addEventListener('ended', switchVideo, true)
})
