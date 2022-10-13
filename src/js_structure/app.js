import { Variables } from "../js_component/variables.js";
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
    this.audio.src = musicList[index].path;
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
    if (this.shuffleBtn == 1) {
      this.shuffleBtn++;
      return (e.target.style.color = "#ffa600b3");
    }
    this.shuffleBtn = 1;
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
      // console.log(singleIndex);
      this.loadTrack(singleIndex);
      this.audio.play();
    } else {
      return;
    }
  }
}
