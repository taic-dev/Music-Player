// MPのデザイン変更
const mpBtn = document.getElementById("mp-btn");
const mpBtnLabel = document.querySelector("label");
mpBtnLabel.addEventListener("click",()=>{
    if(!mpBtn.checked){
        document.body.classList.toggle("dark-theme");
    }else{
        document.body.classList.toggle("dark-theme");
    }
});

// 音楽の情報
const music = {
        title : [
            "Night trip",
            "Pod of Rain",
            "デイライト",
            "水曜日のフィロソフィ"
        ],
        author : [
            "Make a field Music",
            "小川秀和 @hdkzogw56",
            "Ayaco x gooset",
            "仄架よみ feat. Flehmann"
        ],
        img : [
            "jazz.jpg",
            "Pod of Rain.png",
            "デイライト.jpeg",
            "水曜日のフィロソフィ.jpeg"
        ]
}

const mpAction = document.querySelectorAll("li");
const time = document.querySelectorAll("time");
const range = document.querySelector("input[type='range']");
const img = document.querySelector("img");
const title = document.querySelector("h1");
const author = document.querySelector("span");
const musicList = Object.keys(music.title).length;
let musicFlag = 0;
let playFlag = 0;
let chgMpTime = 0;

// 音楽ファイルの読み込み
let getMusic = new Audio("musics/" + music.title[musicFlag] + ".mp3");

// ジャケットの取得
const getImg = () => img.setAttribute("src" , "img/" + music.img[musicFlag]);
getImg();

// タイトルの取得
const getTitle = () => title.textContent = music.title[musicFlag];
getTitle();

// 作者の取得
const getAuthor = () => author.textContent = music.author[musicFlag];
getAuthor();

// 音楽の長さを取得
const getMusicLength = () => {
    getMusic.addEventListener("loadedmetadata",() => {
        let duration = getMusic.duration;
        let min = Math.floor(duration / 60);
        let sec = Math.floor(duration - min * 60);
    
        range.max=duration;
    
        if(sec<10){
            sec = "0"+sec;
            time[1].textContent = min+":"+sec;
        }else{
            time[1].textContent = min+":"+sec;
        }
    });
}
getMusicLength();

// 音楽の諸々の情報を取得
const getMusicInfo = () => {
    getMusic.pause();
    getMusic = new Audio("musics/" + music.title[musicFlag] + ".mp3");
    getImg();
    getTitle();
    getAuthor();
    getMusicLength();
    getMusicPosition();
    getMusicEnded();
    getMusicPlay();
    getMusicPause();
    getMusic.play();
}

// 再生位置を取得
const getMusicPosition = () => {
    getMusic.addEventListener("timeupdate",() => {
        let mpTime = Math.floor(getMusic.currentTime);
        let min = Math.floor(mpTime / 60);
        let sec = Math.floor(mpTime - min * 60);
    
        range.value=mpTime;
    
        if(Math.floor(mpTime) >= 60){
            if(sec<10){
                sec = "0"+sec;
                time[0].textContent = min+":"+sec;
            }else{
                time[0].textContent = min+":"+sec;
            }
        }else{
            if(mpTime < 10){
                time[0].textContent = "0:0"+mpTime;
            }else{
                time[0].textContent = "0:"+mpTime;
            }
        }
    });
}
getMusicPosition();

// 最後まで再生したら
const getMusicEnded = () => {
    getMusic.addEventListener("ended",() => {
        playFlag = 0;
        time[0].textContent = "0:00";
        range.value=0;
    });
}
getMusicEnded();

// 再生したら
const getMusicPlay = () => {
    getMusic.addEventListener('play', () => {
        chgIcon();
    });
}
getMusicPlay();

// 再生が止まったら
const getMusicPause = () => {
    getMusic.addEventListener('pause', () => {
        chgIcon();
    });
}
getMusicPause();

// アイコンの切り替え
const chgIcon = () => {
    mpAction[2].firstChild.classList.toggle("fa-play");
    mpAction[2].firstChild.classList.toggle("fa-pause");
}

// 音楽再生/停止
mpAction[2].addEventListener("click",() => {
    if(playFlag == 0) {
        getMusic.play();
        playFlag = 1;
    }else{
        getMusic.pause();
        playFlag = 0;
    }
});

// 前の音楽を再生
mpAction[1].addEventListener("click",() => {
    if(musicFlag == 0){
        musicFlag = musicList - 1;
    }else{
        musicFlag--;
    }
    getMusicInfo();
})

// 次の音楽を再生
mpAction[3].addEventListener("click",() => {
    if(musicFlag + 1 == musicList){
        musicFlag = 0;
    }else{
        musicFlag++;
    }
    getMusicInfo();
});


// つまみを動かしたら
range.addEventListener("input",() => {
    getMusic.pause();
    playFlag = 0;
    chgMpTime = range.value;
});

// つまみを離したら
range.addEventListener("change",() => {
    getMusic.currentTime = chgMpTime
});