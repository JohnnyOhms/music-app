import { Variables } from "../js_component/variables.js";
// import { Shuffle } from "../js_component/shufffle.js";
import { musicList, Images } from "./tracks.js";

export class Music extends Variables {
  constructor() {
    super();
    this.configure();
    this.loadImage();
  }

  loadTrack(index) {
    clearInterval(this.timer);
    this.track_duration.value = 0;
    if (this.shuffleBtn == 2) {
      Shuffle.shuffleTrack();
      this.audio.src = this.shuffleArray[index].path;
    } else {
      this.audio.src = musicList[index].path;
    }
    this.track_name.innerHTML = `<strong>${musicList[index].artist}</strong><p>${musicList[index].songName}</p>`;
    this.audio.load();
    this.timer = setInterval(this.trackSlideDuration.bind(this), 1000);
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

  startSong(e) {
    this.loadTrack(this.trackIndex);
    this.loadImage();
    if (!this.trackNowPlaying) {
      this.audio.play();
      this.trackNowPlaying = true;
      e.target.classList.replace("fa-play", "fa-pause");
      e.target.style.color = "#ffa600b3";
    } else {
      this.audio.pause();
      e.target.classList.replace("fa-pause", "fa-play");
      this.trackNowPlaying = false;
      e.target.style.color = "#ffff";
    }
  }

  nextSong() {
    this.loadImage();
    if (this.trackIndex >= musicList.length - 1) {
      this.trackIndex = 0;
      this.loadTrack(this.trackIndex);
      this.audio.play();
    } else {
      this.trackIndex++;
      this.loadTrack(this.trackIndex);
      this.audio.play();
    }
  }

  prevSong() {
    this.loadImage();
    if (!this.trackIndex <= 0) {
      this.trackIndex--;
      this.loadTrack(this.trackIndex);
      this.audio.play();
    } else {
      this.trackIndex = musicList.length - 1;
      this.loadTrack(this.trackIndex);
      this.audio.play();
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
        this.audio.play();
      } else {
        if (this.auto_repeat == 1) {
          this.trackIndex = 0;
          this.loadTrack(this.trackIndex);
          this.audio.play();
        }
      }
    }
  }

  singleRepeat() {
    if (this.auto_repeat == 2) {
      let index = this.trackIndex;
      let singleIndex = musicList.findIndex(getTrackIndex);
      function getTrackIndex(track) {
        return track.id === musicList[index].id;
      }
      this.loadTrack(singleIndex);
      this.audio.play();
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
    this.shuffleArray = [...musicList];
    Shuffle.shuffleMethod(this.shuffleArray);
    // Shuffle.shuffleMethod(musicList);
    console.log(this.shuffleArray);
  }
}
