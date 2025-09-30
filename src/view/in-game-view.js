import { TicTacToe } from '../tic-tac-toe.js';
import { getById } from '../utils.js';
import { MenuView } from './menu-view.js';
import { View } from './view.js';

export class InGameView extends View {
  /**
   * @type {1|2}
   */
  playerMode;

  ticTacToe;

  constructor(ctx, playerMode) {
    super('app-view-in-game', getById('app-view-in-game'), ctx);
    this.playerMode = playerMode;
    this.ticTacToe = new TicTacToe();
  }

  setup() {
    const [ playerDisplay ] = this.query('.player-display');

    this.query('.grid__cell').forEach(entry => {
      entry.addEventListener('click', _ => {
        const index = parseInt(entry.dataset.index);
        const row = Math.floor(index / 3);
        const col = index % 3;

        console.assert(row >= 0 && row < 3);
        console.assert(col >= 0 && col < 3);

        if (this.ticTacToe.grid[row][col] != '-') return;

        this.ticTacToe.grid[row][col] = this.ctx.player;

        if (this.ticTacToe.checkForWin()) {
          setTimeout(() => {
            confirm(`Vitória do jogador: ${this.ctx.player}`);
            this.ctx.queueToChange(new MenuView(this.ctx));
          }, 0);
        } else {
          entry.innerText = this.ctx.player;
          this.ctx.changePlayer();
          playerDisplay.innerHTML = `Jogador: ${this.ctx.player}`;
          playerDisplay.dataset.turn = this.ctx.player;
        }
      });
    })
  }
}
