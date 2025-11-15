import { TicTacToe } from '../tic-tac-toe.js';
import { getById } from '../utils.js';
import { MenuView } from './menu-view.js';
import { View } from './view.js';

export class InGameView extends View {
  /**
   * @type {1|2}
   */
  playerMode;

  /**
   * @type {TicTacToe}
   */
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
    super('app-view-in-game', getById('app-view-in-game'), ctx, 'Partida em andamento');
    this.playerMode = playerMode;
    this.ticTacToe = new TicTacToe();
    // elementos
    this.playerDisplay = this.query('.player-display')[0];
    this.gridCellElements = this.query('.grid__cell');
  }

  setup() {
    this.updateplayerDisplay();

    this.ctx.resetPlayState();
    
    document.addEventListener('keyup', this.handleKeyUp);

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

        this.processChoice();
      });
    })
  }

  cleanup() {
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  /**
   * 
   * @param {KeyboardEvent} e 
   */
  handleKeyUp = (e) => {
    if (e.code === 'Escape' && !this.ctx.isModalOpen()) {
      this.ctx.confirm(`Pausado`, 'O que deseja fazer?', {
        confirmDescription: 'Retomar Partida',
        declineDescription: 'Voltar ao Menu',
        confirm: () => {},
        decline: () => {
          this.ctx.queueToChange(new MenuView(this.ctx));
        },
      });
    }
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
  updateplayerDisplay(message = '') {
    this.playerDisplay.innerHTML = `Jogador: ${this.ctx.player} ${message}`;
    this.playerDisplay.dataset.turn = this.ctx.player;
  }

  makePlayer2Choice() {
    this.lockGridInput();

    this.updateplayerDisplay('[ decidindo ]');

    setTimeout(() => {
      let found = false;
      let i = 0, j = 0;

      let finalMove = this.findFinalMoveIfAny();

      if (!finalMove) {
        finalMove = this.findCounterFinalMoveIfAny();
      }

      if (finalMove) {
        [ i, j ] = finalMove;
        found = true;
      } else {
        // encontra primeira célula vazia
        outer:
        for (i = 0; i < 3; i++) {
          for (j = 0; j < 3; j++) {
            if (this.ticTacToe.grid[i][j] === '-') {
              found = true;
              break outer;
            }
          }
        }
      }

      if (found) {
        this.ticTacToe.grid[i][j] = this.ctx.player;
        const index = i * 3 + j;
        console.assert(index < this.gridCellElements.length);
        this.gridCellElements[index].innerText = this.ctx.player;
        
        // @todo João, refazer isso com uma classe de animação...
        this.gridCellElements[index].classList.add('active');
        setTimeout(() => {
          this.gridCellElements[index].classList.remove('active');
        }, 40);

        this.unlockGridInput();
        this.processChoice();

        return;
      }

      console.assert(false, "Não deveria ter passado por aqui sem nenhum espaço em branco na Grid. Avaliar");
      console.table(this.ticTacToe.grid);
      
    }, 500 + Math.random() * 1000);
  }

  /**
   * 
   * @returns {false|number[]}
   */
  findFinalMoveIfAny() {
    const grid = this.ticTacToe.grid;
    const player = this.ctx.player;

    for (let i = 0; i < 3; i++) {
      let empty = 0;
      let fromPlayer = 0;
      for (let j = 0; j < 3; j++) {
        empty += Number(grid[i][j] === '-');
        fromPlayer += Number(grid[i][j] === player);
      }

      if (empty === 1 && fromPlayer === 2) {
        for (let j = 0; j < 3; j++) {
          if (grid[i][j] === '-') return [i, j];
        }
      }
    }

    for (let i = 0; i < 3; i++) {
      let empty = 0;
      let fromPlayer = 0;
      for (let j = 0; j < 3; j++) {
        empty += Number(grid[j][i] === '-');
        fromPlayer += Number(grid[j][i] === player);
      }

      if (empty === 1 && fromPlayer === 2) {
        for (let j = 0; j < 3; j++) {
          if (grid[j][i] === '-') return [j, i];
        }
      }
    }

    // @todo joão, terminar de testar diagonais
    {
      let empty = 0;
      let fromPlayer = 0;
      for (let i = 0; i < 3; i++) {
        empty += Number(grid[i][i] === '-');
        fromPlayer += Number(grid[i][i] === player);
      }

      if (empty === 1 && fromPlayer === 2) {
        for (let i = 0; i < 3; i++) {
          if (grid[i][i] === '-') return [i, i];
        }
      }
    }

    {
      let empty = 0;
      let fromPlayer = 0;
      for (let i = 0; i < 3; i++) {
        empty += Number(grid[i][2 - i] === '-');
        fromPlayer += Number(grid[i][2 - i] === player);
      }

      if (empty === 1 && fromPlayer === 2) {
        for (let i = 0; i < 3; i++) {
          if (grid[i][2 - i] === '-') return [i, i];
        }
      }
    }

    return false;
  }

  /**
   * 
   * @returns {false|number[]}
   */
  findCounterFinalMoveIfAny() {
    const grid = this.ticTacToe.grid;
    const otherPlayer = this.ctx.player === 'O' ? 'X' : 'O';

    for (let i = 0; i < 3; i++) {
      let empty = 0;
      let fromPlayer = 0;
      for (let j = 0; j < 3; j++) {
        empty += Number(grid[i][j] === '-');
        fromPlayer += Number(grid[i][j] === otherPlayer);
      }

      if (empty === 1 && fromPlayer === 2) {
        for (let j = 0; j < 3; j++) {
          if (grid[i][j] === '-') return [i, j];
        }
      }
    }

    for (let i = 0; i < 3; i++) {
      let empty = 0;
      let fromPlayer = 0;
      for (let j = 0; j < 3; j++) {
        empty += Number(grid[j][i] === '-');
        fromPlayer += Number(grid[j][i] === otherPlayer);
      }

      if (empty === 1 && fromPlayer === 2) {
        for (let j = 0; j < 3; j++) {
          if (grid[j][i] === '-') return [j, i];
        }
      }
    }

    // @todo joão, terminar de testar diagonais
    {
      let empty = 0;
      let fromPlayer = 0;
      for (let i = 0; i < 3; i++) {
        empty += Number(grid[i][i] === '-');
        fromPlayer += Number(grid[i][i] === otherPlayer);
      }

      if (empty === 1 && fromPlayer === 2) {
        for (let i = 0; i < 3; i++) {
          if (grid[i][i] === '-') return [i, i];
        }
      }
    }

    {
      let empty = 0;
      let fromPlayer = 0;
      for (let i = 0; i < 3; i++) {
        empty += Number(grid[i][2 - i] === '-');
        fromPlayer += Number(grid[i][2 - i] === otherPlayer);
      }

      if (empty === 1 && fromPlayer === 2) {
        for (let i = 0; i < 3; i++) {
          if (grid[i][2 - i] === '-') return [i, i];
        }
      }
    }

    return false;
  }

  /**
   * @private
   */
  processChoice() {
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
  }

  onBackPressed() {
    if (!this.ctx.isModalOpen()) {
      this.ctx.confirm(`Pausado`, 'O que deseja fazer?', {
        confirmDescription: 'Retomar Partida',
        declineDescription: 'Voltar ao Menu',
        confirm: () => {},
        decline: () => {
          this.ctx.queueToChange(new MenuView(this.ctx));
        },
      });
    }
    
    return true;
  }
}
