'use strict';

let sliderList = document.querySelector(".slider__content");
let playerList = document.querySelector(".player__playlist");
let sliderName = document.querySelector(".slider__name");
let sliderTitle = document.querySelector(".slider__title");
let sliderImg = document.querySelector(".slider__img");


for (let i=0; i<songs.length; i++) {
     var y = songs[i];

     var listItem = document.createElement('li');
     var imgItem = document.createElement('img');
     var divItem = document.createElement('div');
     var bItem = document.createElement('b');
     var pItem = document.createElement('p');
     var spanItem = document.createElement('span');
     var audioItem = document.createElement('audio');

     listItem.classList.add("player__song");
     imgItem.classList.add("player__img");
     divItem.classList.add("player__context");
     bItem.classList.add("player__name");
     pItem.classList.add("player__title");
     spanItem.classList.add("player__song-time");
     audioItem.classList.add("audio");

     playerList.appendChild(listItem);  
     listItem.appendChild(imgItem); 
     listItem.appendChild(divItem);
     listItem.appendChild(spanItem); 
     listItem.appendChild(audioItem);

     divItem.appendChild(bItem);
     divItem.appendChild(pItem);

     imgItem.setAttribute("src", y.img);
     imgItem.setAttribute("alt", 'image');
     audioItem.setAttribute("src", y.audio);

     listItem.dataset.index = i;

     bItem.textContent = y.name;
     pItem.textContent = y.artist;
}

 let libraryItem = Array.from(document.querySelectorAll(".player__song"));
 let audioList = Array.from(document.querySelectorAll(".audio"));
 let audio = document.querySelector(".audio");
 let icon = document.getElementById("play");
 let progressBar = document.querySelector('.progress__time');
 let songTime = document.querySelector('player__song-time');  
 let bgColor = ['#FFFFE0', '#FFD1EB', '#D6F5F5', '#E8F4A1', '#F3F3C7', '#FFDEFF', '#EDEDED'];
 let playing = false;
 let song;
 

function changeBgColor(number) {
    document.body.style.backgroundColor = bgColor[number];
}

function chooseSong(item) {
    let song = audioList[item];
    for (let use of audioList) {
          if (use != song) {
              use.pause();
              use.currentTime = 0;
          } 
        if (playing) song.play();
    } 
  }

libraryItem.forEach((item) => {
    item.addEventListener("click", () => {
    chooseSong(item.dataset.index); 
    sliderContent(item.dataset.index);
    changeBgColor(item.dataset.index);
    });
  });    

function sliderContent(y) {
       var active = document.querySelector('.active');
    if (active) {
        active.classList.remove('active'); 
    }
    playerList.children[y].classList.add('active');  

   var x = songs[y];
   sliderName.textContent = x.artist;
   sliderTitle.textContent = x.name;
   sliderImg.src = x.img;
   sliderImg.alt = 'image';
   song = audioList[y]; 

   sliderTitle.style.animationName = "run-text";
    
    if (sliderTitle.textContent.length > 19) {
        let textWrap = document.createElement("span");
        textWrap.className = "text-wrap";
        textWrap.innerHTML = sliderTitle.textContent+'  '+sliderTitle.textContent; 
        sliderTitle.innerHTML = "";
        sliderTitle.append(textWrap);
    }  
}
sliderTitle.addEventListener("animationend", () => sliderTitle.style.animationName ='');

sliderContent (0);

const back = document.getElementById("back");
const next = document.getElementById("next");
back.addEventListener("click", () => skipSong("back"));
next.addEventListener("click", () => skipSong("next"));


function skipSong(direction) {
  let index;
  const selectedSong = document.querySelector(".active");
  let selectedSongIndex = libraryItem.indexOf(selectedSong);
  selectedSong.classList.remove("active");

  if (direction === "back") {
   let previousSong = libraryItem[selectedSongIndex - 1];
    if (libraryItem.indexOf(previousSong) === -1) { 
      previousSong = libraryItem[libraryItem.length - 1];
    }
    previousSong.classList.add("active");

   index = libraryItem.indexOf(previousSong);
        sliderContent(index);
        chooseSong(index);
        changeBgColor(index);

  } else if (direction === "next") {
   let nextSong = libraryItem[selectedSongIndex + 1];

    if (libraryItem.indexOf(nextSong) === -1) {
      nextSong = libraryItem[0];
    }
    nextSong.classList.add("active");
    
   index = libraryItem.indexOf(nextSong);
        sliderContent(index);
        chooseSong(index);
        changeBgColor(index);
  }
}

function progresUpdate() {
 progressBar.style.width = (this.currentTime / this.duration) * 100 + "%";

if (playing&&this.duration == this.currentTime) {
        skipSong("next");
    }
}

function durationSongs() {
    let min = parseInt(this.duration / 60);
    if (min < 10) {
      min = "0" + min;
    }
    let sec = parseInt(this.duration % 60);
    if (sec < 10) {
      sec = "0" + sec;
    }
    const playerSongTime = `${min}:${sec}`;
    this.closest(".player__song").querySelector(".player__song-time").append(playerSongTime);
}

audioList.forEach(song => { 
    song.addEventListener("timeupdate" , progresUpdate);
   song.addEventListener("loadeddata" , durationSongs);
});

function Play() { 
     if (song.paused) { //true когда не играет, false когда играет
       icon.className = "fas fa-pause";
      song.play();
     } else {
     icon.className = "fas fa-play";
      song.pause();
      playing = false;
     }
}

  icon.addEventListener("click", () => { 
    playing = true;  
    Play();
     });

/*    open slider      */
 let playerHeader = document.querySelector(".player__header");
 let imgPosition = document.querySelector(".player__img--position");
 let playerControls = document.querySelector(".player__controls");
 let playerIcon = document.querySelector(".player__icon");

function openPlayer() {
     if(playerHeader.classList.contains("open-header")) {
         playerHeader.classList.remove("open-header");
         imgPosition.classList.remove("open-pos");
         playerControls.classList.remove("open-panel");
     }else {
        playerHeader.classList.add("open-header");
        imgPosition.classList.add("open-pos");
        playerControls.classList.add("open-panel");
     }
}

playerIcon.addEventListener("click", openPlayer);

