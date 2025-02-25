import Phaser from "phaser";
// import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import ButtonPlugin from "phaser3-rex-plugins/plugins/button-plugin.js";
import DragPlugin from "phaser3-rex-plugins/plugins/drag-plugin.js";
import GlowFilterPipelinePlugin from "phaser3-rex-plugins/plugins/glowfilter2pipeline-plugin.js";
import PathFollowerPlugin from "phaser3-rex-plugins/plugins/pathfollower-plugin.js";
import RoundRectangleCanvasPlugin from "phaser3-rex-plugins/plugins/roundrectanglecanvas-plugin.js";
import { Boot } from "./scenes/Boot";
import { Preloader } from "./scenes/Preloader";
import { MainMenu } from "./scenes/MainMenu";
import { Game } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";
import TabScene from "./scenes/TabScene";

const config = {
  type: Phaser.AUTO,
  antialias: true,
  disableContextMenu: true,
  autoMobilePipeline: true,
  autoRound: true,
  width: 1280,
  height: 720,
  parent: "game-container",
  backgroundColor: "#000000",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [Boot, Preloader, MainMenu, Game, GameOver, TabScene],
  plugins: {
    scene: [
      {
        key: "rexUI",
        plugin: UIPlugin,
        mapping: "rexUI",
      },
    ],
    global: [
      {
        key: "rexButton",
        plugin: ButtonPlugin,
        start: true,
      },
      {
        key: "rexDrag",
        plugin: DragPlugin,
        start: true,
      },
      {
        key: "rexGlowFilterPipeline",
        plugin: GlowFilterPipelinePlugin,
        start: true,
      },
      {
        key: "rexPathFollower",
        plugin: PathFollowerPlugin,
        start: true,
      },
      {
        key: "rexRoundRectangleCanvasPlugin",
        plugin: RoundRectangleCanvasPlugin,
        start: true,
      },
      // {
      //   key: "rexDrag",
      //   plugin: DragPlugin,
      //   start: true,
      // },
      // {
      //   key: "rexGlowFilterPipeline",
      //   plugin: GlowFilterPipelinePlugin,
      //   start: true,
      // },
    ],
  },
};

export default new Phaser.Game(config);
