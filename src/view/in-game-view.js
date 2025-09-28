import { getById } from '../utils.js';
import { View } from './view.js';

export class InGameView extends View {
  constructor(ctx) {
    super('app-view-in-game', getById('app-view-in-game'), ctx);
  }

  setup() {
    const [ playerDisplay ] = this.query('.player-display');

    this.query('.grid__cell').forEach(entry => {
      entry.addEventListener('click', event => {
        if (entry.innerText) return;

        entry.innerText = this.ctx.player;
        this.ctx.changePlayer();
        playerDisplay.innerHTML = `Jogador: ${this.ctx.player}`;
        playerDisplay.dataset.turn = this.ctx.player;
      });
    })
  }
}
