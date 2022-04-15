const mpAction = document.querySelectorAll("li");
const time = document.querySelectorAll("time");
const range = document.querySelector("input[type='range']");
let playFlag = 0;
let chgMpTime = 0;
// 音楽ファイルの読み込み
const music = new Audio("musics/Night_trip.mp3");

// 音楽の長さを取得
music.addEventListener("loadedmetadata",() => {
    let duration = music.duration;
    let min = Math.floor(duration / 60);
    let sec = Math.floor(duration - min * 60);

    range.max=duration;

    if(sec<10)sec = "0"+sec;
    time[1].textContent = min+":"+sec;
});

// 音楽再生/停止
mpAction[2].addEventListener("click",() => {
    chgIcon();
    if(playFlag == 0) {
        music.play();
        playFlag = 1;

    }else{
        music.pause();
        playFlag = 0;

    }
});

// 再生位置を取得
music.addEventListener("timeupdate",() => {
    let mpTime = Math.floor(music.currentTime);
    let min = Math.floor(mpTime / 60);
    let sec = Math.floor(mpTime - min * 60);

    if(!chgMpTime){
        range.value=mpTime;
    }else{
        console.log("check");
        range.value=chgMpTime;
        music.currentTime = chgMpTime
    }

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

// 最後まで再生したら
music.addEventListener("ended",() => {
    playFlag = 0;
    chgIcon();
    time[0].textContent = "0:00";
    range.value=0;
});

// つまみを動かしたら
range.addEventListener("input",() => {
    music.pause();
    playFlag = 0;
    chgMpTime = range.value;
    console.log(chgMpTime);
    
});

range.addEventListener("change",() => {
    console.log(chgMpTime);
});

// アイコンの切り替え
const chgIcon = () => {
    mpAction[2].firstChild.classList.toggle("fa-play");
    mpAction[2].firstChild.classList.toggle("fa-pause");
}