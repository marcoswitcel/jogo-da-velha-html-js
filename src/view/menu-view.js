import { getById } from '../utils.js';
import { View } from './view.js';
import { InGameView } from './in-game-view.js';

export class MenuView extends View {
  constructor(ctx) {
    super('app-view-menu', getById('app-view-menu'), ctx);
  }

  setup() {
    this.rootElement.querySelector('#btn-action-play').addEventListener('click', () => {
      this.ctx.queueToChange(new InGameView(this.ctx, 1));
    });
    this.rootElement.querySelector('#btn-action-play2').addEventListener('click', () => {
      this.ctx.queueToChange(new InGameView(this.ctx, 2));
    });
  }
}
