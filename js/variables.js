export class Variables {
  constructor() {
    this.nav_btn = document.querySelector(".nav");
    this.song_img = document.querySelectorAll("#song_img");
    this.control_btn = document.querySelector(".control-btn");
    this.add_music = document.querySelector("#add-music");
    this.musics_select = document.querySelector(".music-section__select");
    this.fav_music = document.querySelectorAll(".fav-select");
    this.most_played = document.querySelector(".most-played__list");
    this.track_name = document.querySelector(".track__name");
    this.track_control = document.querySelector(".track__control");
    this.track_timer = document.querySelector(".timer__count");
    this.track_volume = document.querySelector("#volume-control");
    this.track_duration = document.querySelector("#track-duration");
    this.loop_CurrentSong = document.querySelector(".curr-repeat");
    this.footer_alert = document.querySelector(".footer__alert");
    this.audio = new Audio();
    this.timer;
    this.trackIndex = 0;
    this.trackNowPlaying = false;
    this.auto_repeat = 0;
    this.imageCount = 0;
    this.shuffleBtn = 0;
    this.favourite = false;
  }
}
