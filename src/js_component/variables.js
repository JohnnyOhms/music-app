export class Variables {
  constructor() {
    this.nav_btn = document.querySelector(".nav");
    this.song_img = document.querySelector("#song_img");
    this.control_btn = document.querySelector(".control-btn");
    this.add_music = document.querySelector("#add-music");
    this.musics = document.querySelectorAll(".music");
    this.fav_music = document.querySelectorAll(".fav-select");
    this.most_played = document.querySelector(".most-played__list");
    this.track_name = document.querySelector(".track__name");
    this.track_control = document.querySelector(".track__control");
    this.track_timer = document.querySelector(".track p");
    this.track_volume = document.querySelector("#volume-control");
    this.track_duration = document.querySelector("#track-duration");
    this.loop_CurrentSong = document.querySelector(".curr-repeat");
    this.audio = document.createElement("audio");
    this.timer;
    this.trackIndex = 0;
    this.trackNowPlaying = false;
    this.auto_repeat = 0;
    this.imageCount = 0;
    this.shuffleArray = [];
    this.shuffleBtn = 1;
  }
}
