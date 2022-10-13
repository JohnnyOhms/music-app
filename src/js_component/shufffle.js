import { musicList } from "../js_structure/tracks";

export class Shuffle {
  constructor() {}

  static shuffle(product) {
    let currenIndex = product.length,
      randomIndex;
    while (currenIndex != 0) {
      randomIndex = Math.floor(Math.random() * currenIndex);
      currenIndex--;

      [product[currenIndex], product[randomIndex]] = [
        product[randomIndex],
        product[currenIndex],
      ];
    }
  }
}
