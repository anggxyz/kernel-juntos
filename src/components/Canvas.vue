<template>
  <div id="canvas"></div>
</template>

<script>
import P5 from "p5";

export default {
  name: "Canvas",
  props: {
    fellowName: {
      type: String,
      required: true
    }
  },
  mounted() {
    const script = p5 => {
      let colors = [
        "#5BF1CD",
        "#02E2AC",
        "#11BC92",
        "#FFFA7F",
        "#FFCC00",
        "#FFA800",
        "#212144",
        "#6F3FF5",
        "#8C65F7",
        "#55505C",
        "#5932C4",
        "#FFFFFF"
      ];
      let seed = 1000;
      let name = this.$props.fellowName;

      p5.setup = () => {
        p5.rectMode(p5.CENTER);
        let canvasDiv = document.getElementById("canvas");
        p5.createCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight);
        for (let i = 0; i < name.length; i++) {
          seed = seed + name.charCodeAt(i);
        }
        p5.randomSeed(seed);
        p5.background(20);
        p5.noStroke();

        let tiles = 5;
        let tileWidth = p5.width / tiles;

        for (let i = 0; i < tiles; i++) {
          for (let j = 0; j < tiles; j++) {
            let Fill1 = p5.floor(p5.random(0, colors.length));
            let Fill2 = 0;
            let Fill3 = 0;

            while (Fill1 == Fill2) {
              Fill2 = p5.floor(p5.random(0, colors.length));
            }
            while (Fill3 == Fill2) {
              Fill3 = p5.floor(p5.random(0, colors.length));
            }
            p5.fill(colors[Fill1]);
            p5.square(
              i * tileWidth + tileWidth / 2,
              j * tileWidth + tileWidth / 2,
              tileWidth
            );
            let maxR = p5.random(30, tileWidth - 20);
            p5.fill(colors[Fill2]);
            p5.circle(
              i * tileWidth + tileWidth / 2,
              j * tileWidth + tileWidth / 2,
              maxR
            );

            p5.fill(colors[Fill3]);
            p5.circle(
              i * tileWidth + tileWidth / 2,
              j * tileWidth + tileWidth / 2,
              p5.random(20, maxR)
            );
          }
        }
      };
      p5.draw = () => {};
    };
    // Attach the canvas to the div
    // eslint-disable-next-line no-unused-vars
    const p5canvas = new P5(script, "canvas");
  }
};
</script>

<style></style>
