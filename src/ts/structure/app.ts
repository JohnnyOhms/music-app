import { Variables } from "../component/variable";
import { autoBind } from "../component/autoBind";

export class Music extends Variables {
  constructor() {
    super();
    this.configure();
  }

  configure(): void {
    if (this.track_control_play) {
      console.log(this.track_control_play);

      this.track_control_play.addEventListener("click", () => {
        console.log("clicked");
      });
    }
  }

  //   @autoBind
  checkTarget(e: Event) {
    console.log("hello");
  }
  startAudio() {}
}
