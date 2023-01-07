const main = document.getElementById('main');
const changeTheme = document.getElementById('changeTheme');
const themeIcon = document.getElementById('themeIcon');

const audioName = document.querySelector('.info');
const Cover = document.getElementById('Cover');
const audio = document.createElement('audio');

let audioSet = [{
  Name: "Kamado Tanjirou no Uta",
  src: "./Assets/Kamado Tanjirou no.mp3",
  cover: "./Assets/Kamado Tanjirou.JPG"
},{
  Name: "Unravel",
  src: "./Assets/Unravel.mp3",
  cover: "./Assets/Tokyo_Ghoul.jpg",
}];

let songIndex = 0;
loadSong(audioSet,songIndex);

function loadSong(song, index){
  audioName.textContent = song[index].Name;
  Cover.src = song[index].cover;
  audio.src = song[index].src;
}

const backward = document.getElementById('backward');
const forward = document.getElementById('forward');

const musicState = document.getElementById('musicState');
const MusicControl = document.getElementById('MusicControl');
const progressbar = document.getElementById('progressbar');
const progress = document.getElementById('progress');


changeTheme.addEventListener('click', e => {

  
  if( main.getAttribute('data-theme') !== "dark" ){
    main.setAttribute('data-theme', 'dark');
    themeIcon.setAttribute('class', 'fa fa-moon');
  }else{
    main.setAttribute('data-theme', 'light');
    themeIcon.setAttribute('class', 'fa fa-sun');
  }
  
});


musicState.onclick = function(){
  if(audio.paused){
    audio.play();
    MusicControl.src = "./Assets/pause.svg";
    Cover.style.animationPlayState = "running";
  }else{
    audio.pause();
    MusicControl.src = "./Assets/play.svg";
    Cover.style.animationPlayState = "paused";
  }
  
  audio.onended = function(){
    audio.pause()
    MusicControl.src = "./Assets/play.svg";
    Cover.style.removeProperty( 'animation-play-state');
  }
}

audio.addEventListener('timeupdate', (e) => {
  const {duration, currentTime} = e.target;
  const SongsProgress = (currentTime / duration) * 100;
  progress.style.width = `${SongsProgress}%`;
});

progressbar.addEventListener('click', function(e){
  const clickX = e.offsetX;
  const width = this.clientWidth;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});


backward.addEventListener('click', e => {
  songIndex--;

  console.log( songIndex);

  if(songIndex < 0 ){
    songIndex = 0; 
    loadSong(audioSet,songIndex);
    audio.pause();
    MusicControl.src = "./Assets/play.svg";
    Cover.style.animationPlayState = "paused";
  }else{
    loadSong(audioSet,songIndex);
  }

  checkCover();
});

forward.addEventListener('click', e => { 
  
  songIndex++;
  console.log(songIndex);

  if(songIndex < audioSet.length){
    loadSong(audioSet, songIndex);
  }else{
    songIndex = 0;
    loadSong(audioSet, songIndex);

  }

  checkCover();
});

function checkCover(){
  if(Cover.src.includes("Kamado")){
    Cover.style.paddingTop = "200px";
    Cover.style.borderRadius = "50%";
  }else{
    Cover.style.paddingTop = "0px";
  }
}

checkCover();