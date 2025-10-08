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

  acceptingClicks = true;

  constructor(ctx, playerMode) {
    super('app-view-in-game', getById('app-view-in-game'), ctx);
    this.playerMode = playerMode;
    this.ticTacToe = new TicTacToe();
  }

  setup() {
    const [ playerDisplay ] = this.query('.player-display');

    this.query('.grid__cell').forEach(entry => {
      entry.addEventListener('click', _ => {

        if (!this.acceptingClicks) return;

        const index = parseInt(entry.dataset.index);
        const row = Math.floor(index / 3);
        const col = index % 3;

        console.assert(row >= 0 && row < 3);
        console.assert(col >= 0 && col < 3);

        if (this.ticTacToe.grid[row][col] != '-') return;

        this.ticTacToe.grid[row][col] = this.ctx.player;
        
        entry.innerText = this.ctx.player;

        if (this.ticTacToe.checkForWin()) {
          this.ctx.confirm(`Vitória do jogador: ${this.ctx.player}`, 'Deseja jogar novamente?', {
            confirm: () => {
              this.ctx.queueToChange(new InGameView(this.ctx, this.playerMode));
            },
            decline: () => {
              this.ctx.queueToChange(new MenuView(this.ctx));
            },
          });
        } else if (this.ticTacToe.checkForATie()) {
          this.ctx.confirm('O jogo terminou em empate', 'Deseja jogar novamente?', {
            confirm: () => {
              this.ctx.queueToChange(new InGameView(this.ctx, this.playerMode));
            },
            decline: () => {
              this.ctx.queueToChange(new MenuView(this.ctx));
            },
          });
        } else {
          this.ctx.changePlayer();
          playerDisplay.innerHTML = `Jogador: ${this.ctx.player}`;
          playerDisplay.dataset.turn = this.ctx.player;

          if (this.playerMode == 2 && this.ctx.player === 'X') {
            this.lockGridInput();
            // @todo João, incluir um lógica de seleção de célula. Para começar pode pegar qualquer uma
            // e rodar os testes de empate ou término do jogo
            setInterval(() => { this.unlockGridInput(); }, 2000);
          }
        }
      });
    })
  }

  /**
   * @private
   */
  lockGridInput() {
    this.acceptingClicks = false;
  }

  /**
   * @private
   */
  unlockGridInput() {
    this.acceptingClicks = true;
  }
}
