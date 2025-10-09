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

  /**
   * @type {HTMLElement}
   */
  playerDisplay;

  /**
   * @type {HTMLElement[]}
   */
  gridCellElements;

  constructor(ctx, playerMode) {
    super('app-view-in-game', getById('app-view-in-game'), ctx);
    this.playerMode = playerMode;
    this.ticTacToe = new TicTacToe();
    // elementos
    this.playerDisplay = this.query('.player-display')[0];
    this.gridCellElements = this.query('.grid__cell');
  }

  setup() {
    this.updateplayerDisplay();

    this.gridCellElements.forEach(entry => {
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
          this.updateplayerDisplay();

          if (this.playerMode == 2 && this.ctx.player === 'X') {
            this.makePlayer2Choice();
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
  /**
   * @private
   */
  updateplayerDisplay() {
    this.playerDisplay.innerHTML = `Jogador: ${this.ctx.player}`;
    this.playerDisplay.dataset.turn = this.ctx.player;
  }

  makePlayer2Choice() {
    this.lockGridInput();

    setTimeout(() => {
      let hasChoosen = false;
      let i = 0;
      let j = 0;

      outerLoop:
      for (; i < 3; i++) {
        for (j = 0; j < 3; j++) {
          if (this.ticTacToe.grid[i][j] === '-') {
            this.ticTacToe.grid[i][j] = this.ctx.player;
            hasChoosen = true;
            break outerLoop;
          }
        }
      }

      if (hasChoosen) {
        const index = i * 3 + j;
        console.assert(index < this.gridCellElements.length);
        this.gridCellElements[index].innerText = this.ctx.player;
        this.ctx.changePlayer();
        this.updateplayerDisplay();
      } else {
        console.assert(hasChoosen, "Não deveria ter passado por aqui sem nenhum espaço em branco na Grid. Avaliar");
        console.table(this.ticTacToe.grid);
      }
      
      this.unlockGridInput();
    }, 1000);
  }
}
