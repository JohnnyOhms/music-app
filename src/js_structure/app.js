import { Variables } from "../js_component/variables.js";
import { musicList, Images } from "./tracks.js";
// import { AudioVisulization } from "../js_component/audioVisualizer";
let shuffleArray = [];
let list;

export class Music extends Variables {
  constructor() {
    super();
    this.configure();
    this.loadTrack(this.trackIndex);
    this.loadImage();
    this.displayTracks();
  }

  loadTrack(index) {
    clearInterval(this.timer);
    this.track_duration.value = 0;
    if (this.shuffleBtn == 2) {
      this.shuffleControl(index);
    } else {
      this.audio.src = musicList[index].path;
      this.track_name.innerHTML = `<strong>${musicList[index].artist}</strong><p>${musicList[index].songName}</p>`;
    }
    this.audio.load();
    this.timer = setInterval(this.trackSlideDuration.bind(this), 1000);
  }

  shuffleControl(index) {
    let obj = Shuffle.shuffleTrack();
    let shuffled = Object.values(obj[index])[2];
    this.audio.src = shuffled;
    this.track_name.innerHTML = `<strong>${obj[index].artist}</strong><p>${obj[index].songName}</p>`;
  }

  loadImage() {
    if (this.imageCount === 0) {
      this.song_img.src = Images[this.imageCount].path;
      return this.imageCount++;
    }
    if (this.imageCount == 1) {
      this.song_img.src = Images[this.imageCount].path;
      return (this.imageCount = 2);
    }
    if (this.imageCount == 2) {
      this.song_img.src = Images[this.imageCount].path;
      return (this.imageCount = 0);
    }
  }

  configure() {
    this.track_control.addEventListener("click", this.controlTrack.bind(this));
    this.track_volume.addEventListener("change", this.changeVolume.bind(this));
    this.track_duration.addEventListener(
      "change",
      this.changeTrackDuration.bind(this)
    );
    this.audio.addEventListener("timeupdate", this.updateSongTime.bind(this));
    this.control_btn, addEventListener("click", this.controlBtn.bind(this));
  }

  controlTrack(e) {
    if (e.target.classList.contains("play-btn")) {
      this.startSong(e);
    } else if (e.target.classList.contains("fa-forward")) {
      this.nextSong();
    } else if (e.target.classList.contains("fa-backward")) {
      this.prevSong();
    } else if (e.target.classList.contains("fa-repeat")) {
      this.checkRepeat(e);
    } else if (e.target.classList.contains("fa-shuffle")) {
      this.enableShuffle(e);
    }
  }

  controlBtn(e) {
    if (e.target.classList.contains("shuffle-play")) {
      this.shufflePlay(e);
    }
  }

  startSong(e) {
    if (!this.trackNowPlaying) {
      this.play();
      this.addSelectOnplay();
      this.audioVisualization();
    } else {
      this.pause();
    }
  }

  play() {
    let play_pause_btn = document.querySelector(".play-btn");
    this.audio.play();
    this.trackNowPlaying = true;
    play_pause_btn.classList.replace("fa-play", "fa-pause");
    play_pause_btn.style.color = "#ffa600b3";
  }

  pause() {
    let play_pause_btn = document.querySelector(".play-btn");
    this.audio.pause();
    play_pause_btn.classList.replace("fa-pause", "fa-play");
    this.trackNowPlaying = false;
    play_pause_btn.style.color = "#ffff";
  }

  nextSong() {
    this.loadImage();
    if (this.trackIndex >= musicList.length - 1) {
      this.trackIndex = 0;
      this.loadTrack(this.trackIndex);
      this.play();
      this.addSelectOnplay();
    } else {
      this.trackIndex++;
      this.loadTrack(this.trackIndex);
      this.play();
      this.addSelectOnplay();
    }
  }

  prevSong() {
    this.loadImage();
    if (!this.trackIndex <= 0) {
      this.trackIndex--;
      this.loadTrack(this.trackIndex);
      this.play();
      this.addSelectOnplay();
    } else {
      this.trackIndex = musicList.length - 1;
      this.loadTrack(this.trackIndex);
      this.play();
      this.addSelectOnplay();
    }
  }

  checkRepeat(e) {
    if (this.auto_repeat == 0) {
      e.target.style.color = "#ffa600b3";
      this.auto_repeat++;
    } else if (this.auto_repeat == 1) {
      this.loop_CurrentSong.classList.remove("hide");
      this.auto_repeat++;
    } else {
      this.auto_repeat = 0;
      e.target.style.color = "#ffff";
      this.loop_CurrentSong.classList.add("hide");
    }
  }

  enableShuffle(e) {
    this.shuffleBtn++;
    if (this.shuffleBtn == 1) {
      this.shuffleBtn++;
      return (e.target.style.color = "#ffa600b3");
    }
    this.shuffleBtn = 0;
    return (e.target.style.color = "white");
  }

  shufflePlay(e) {
    let shuffleTrackBtn = document.querySelector("#shuffle-btn");
    shuffleTrackBtn.style.color = "#ffa600b3";
    this.enableShuffle(e);
    e.target.style.color = "#ffff";
    this.loadTrack(this.trackIndex);
    this.play();
  }

  changeVolume() {
    this.audio.volume = this.track_volume.value / 100;
  }

  changeTrackDuration() {
    this.audio.currentTime =
      this.audio.duration * (this.track_duration.value / 100);
  }

  trackSlideDuration() {
    let position = this.audio.currentTime * (100 / this.audio.duration);
    this.track_duration.value = position;

    if (this.audio.ended) {
      if (this.auto_repeat === 2 && this.trackIndex <= musicList.length - 1) {
        this.singleRepeat();
        return;
      }
      if (this.trackIndex < musicList.length - 1) {
        this.trackIndex++;
        this.loadTrack(this.trackIndex);
        this.play();
        this.addSelectOnplay();
      } else {
        if (this.auto_repeat == 1) {
          this.trackIndex = 0;
          this.loadTrack(this.trackIndex);
          this.play();
          this.addSelectOnplay();
        } else {
          this.pause();
        }
      }
    }
  }

  singleRepeat() {
    if (this.auto_repeat == 2) {
      let index = this.trackIndex;
      let singleIndex =
        musicList.findIndex(getTrackIndex) ||
        shuffleArray.findIndex(getTrackIndex);
      function getTrackIndex(track) {
        return track.id === musicList[index].id || track.id === shuffleArray.id;
      }
      this.loadTrack(singleIndex);
      this.play();
    } else {
      return;
    }
  }

  updateSongTime() {
    let currentMins = Math.floor(this.audio.currentTime / 60);
    let currentSec = Math.floor(this.audio.currentTime - currentMins * 60);
    let durationMins = Math.floor(this.audio.duration / 60);
    let durationSec = Math.floor(this.audio.duration - durationMins * 60);

    if (currentMins < 10) {
      currentMins = "0" + currentMins;
    }

    if (currentSec < 10) {
      currentSec = "0" + currentSec;
    }

    if (durationMins < 10) {
      durationMins = "0" + durationMins;
    }

    if (durationSec < 10) {
      durationSec = "0" + durationSec;
    }

    this.track_timer.innerHTML = `${currentMins}:${currentSec}/${durationMins}:${durationSec}`;

    if (!this.audio.duration) {
      this.track_timer.innerHTML = "00:00/00:00";
    }
  }

  displayTracks() {
    let display = "";
    let counter1 = 0,
      counter2 = 0,
      counter3 = 0;
    musicList.forEach((track) => {
      display += `<div class="music" data-id=${counter1++}>
                  <p data-id=${counter2++} id="para">${track.songName}</p>
                  <span><i class="fa-solid fa-heart fav-select" data-id="${counter3++}"></i></span>
                </div> `;
    });
    this.musics_select.innerHTML = display;
    this.selectTrackToPlay();
    this.selectFav();
  }

  selectTrackToPlay() {
    const musics = document.querySelectorAll(".music");
    musics.forEach((item) => {
      item.addEventListener("click", (e) => {
        let index = e.target.dataset.id;
        musics.forEach((item) => {
          item.classList.remove("selected");
          e.target.classList.add("selected");
          if (e.target.id === "para") {
            e.target.parentElement.classList.add("selected");
          }
        });
        if (index) {
          this.loadTrack(index);
          this.play();
        }
      });
    });
  }

  addSelectOnplay() {
    const musics = document.querySelectorAll(".music");
    musics.forEach((item) => {
      if (this.shuffleBtn === 2) {
        item.classList.remove("selected");
        return;
      }
      if (item.dataset.id === this.trackIndex.toString()) {
        musics.forEach((item) => {
          item.classList.remove("selected");
        });
        item.classList.add("selected");
      }
    });
  }

  selectFav() {
    const fav = [...document.querySelectorAll(".fav-select")];
    fav.map((item) => {
      item.addEventListener("click", (e) => {
        let id = item.dataset.id;
        if (!this.favourite) {
          this.favourite = true;
          item.classList.add("fav");
          Storage.addToStorage(id);
        } else {
          item.classList.remove("fav");
          this.favourite = false;
          Storage.getFromStorage();
          list.filter(function (e) {
            return e === id;
          });
          Storage.addToStorage(list);
        }
      });
    });
  }

  audioVisualization() {
    var context = new AudioContext();
    var src = context.createMediaElementSource(this.audio);
    var analyser = context.createAnalyser();
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 256;
    // var bufferLength = analyser.frequencyBinCount;
    var bufferLength = 50;
    var dataArray = new Uint8Array(bufferLength);
    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;
    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;
    function renderFrame() {
      requestAnimationFrame(renderFrame);
      x = 0;
      analyser.getByteFrequencyData(dataArray);
      ctx.fillStyle = "rgba(82, 30, 30, 0.296)";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        var r = 186;
        var g = 133;
        var b = 34;

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    }
    this.audio.play();
    renderFrame();
  }
}

class Storage extends Variables {
  constructor() {}

  static getFromStorage() {
    if (localStorage.getItem("fav") === null) {
      list = [];
    } else {
      list = JSON.parse(localStorage.getItem("fav"));
    }
  }

  static addToStorage(id) {
    Storage.getFromStorage();
    list.push(id);
    localStorage.setItem("fav", JSON.stringify(list));
  }
}

class Shuffle extends Variables {
  constructor() {}

  static shuffleMethod(array) {
    let currenIndex = array.length,
      randomIndex;
    while (currenIndex != 0) {
      randomIndex = Math.floor(Math.random() * currenIndex);
      currenIndex--;

      [array[currenIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currenIndex],
      ];
    }

    return array;
  }

  static shuffleTrack() {
    shuffleArray = [...musicList];
    Shuffle.shuffleMethod(shuffleArray);
    return shuffleArray;
  }
}
// class AudioVisulization extends Variables {
//   constructor() {}

//   static visualization() {
//     console.log(this.audio);
//     var context = new AudioContext();
//     var src = context.createMediaElementSource(this.audio);
//     var analyser = context.createAnalyser();
//     var canvas = document.getElementById("canvas");
//     //   canvas.width = window.innerWidth;
//     //   canvas.height = window.innerHeight;
//     var ctx = canvas.getContext("2d");
//     src.connect(analyser);
//     analyser.connect(context.destination);
//     analyser.fftSize = 256;
//     var bufferLength = analyser.frequencyBinCount;
//     console.log(bufferLength);
//     var dataArray = new Uint8Array(bufferLength);
//     var WIDTH = canvas.width;
//     var HEIGHT = canvas.height;
//     console.log(WIDTH);
//     console.log(HEIGHT);
//     var barWidth = (150 / bufferLength) * 2.5;
//     var barHeight;
//     var x = 0;
//     function renderFrame() {
//       requestAnimationFrame(renderFrame);
//       x = 0;
//       analyser.getByteFrequencyData(dataArray);
//       ctx.fillStyle = "#ffff";
//       ctx.fillRect(0, 0, WIDTH, HEIGHT);
//       for (var i = 0; i < bufferLength; i++) {
//         barHeight = dataArray[i];
//         //   var r = barHeight + 25 * (i / bufferLength);
//         var r = 31;
//         var g = 250 * (i / bufferLength);
//         var b = 24;
//         console.log(r);
//         console.log(g);
//         console.log(b);
//         ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
//         ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
//         x += barWidth + 1;
//       }
//     }
//     audio.play();
//     renderFrame();
//   }
// }
