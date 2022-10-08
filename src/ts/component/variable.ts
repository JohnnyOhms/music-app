export abstract class Variables {
  nav_btn: HTMLDivElement;
  song_img: HTMLImageElement;
  control_btn: HTMLDivElement;
  add_music: HTMLInputElement;
  musics: NodeListOf<HTMLDivElement>;
  fav_music: NodeListOf<HTMLSpanElement>;
  most_played: HTMLDivElement;
  track_name: HTMLDivElement;
  track_control_play;
  track_timer: HTMLParagraphElement;
  track_volume: HTMLInputElement;
  track_duration: HTMLInputElement;
  track: HTMLAudioElement;
  trackIndex: number;
  trackNowPlaying: boolean;
  public constructor() {
    this.nav_btn = document.querySelector(".nav") as HTMLDivElement;
    this.song_img = document.querySelector("#song_img") as HTMLImageElement;
    this.control_btn = document.querySelector(".control-btn") as HTMLDivElement;
    this.add_music = document.querySelector("#add-music") as HTMLInputElement;
    this.musics = document.querySelectorAll<HTMLDivElement>(".music");
    this.fav_music = document.querySelectorAll(
      ".fav-select"
    ) as NodeListOf<HTMLSpanElement>;
    this.most_played = document.querySelector(
      ".most-played__list"
    ) as HTMLDivElement;
    this.track_name = document.querySelector(".track__name") as HTMLDivElement;
    this.track_control_play = document.querySelector(".fa-play");
    this.track_timer = document.querySelector(
      ".track p"
    ) as HTMLParagraphElement;
    this.track_volume = document.querySelector(
      "#volume-control"
    ) as HTMLInputElement;
    this.track_duration = document.querySelector(
      "#track-duration"
    ) as HTMLInputElement;
    this.track = document.createElement("audio") as HTMLAudioElement;
    this.trackIndex = 0;
    this.trackNowPlaying = false;
    // this.configure();
  }

  // configure(): void {
  //   this.track_volume.addEventListener("change", this.checkTarget.bind(this));
  // }

  // // @autoBind
  // checkTarget(e: Event) {
  //   console.log("hello");
  // }
}
