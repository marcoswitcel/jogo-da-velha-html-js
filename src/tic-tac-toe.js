
export class TicTacToe {
  /**
   * @type {('-'|'O'|'X')[][]}
  */
  grid = [['-', '-', '-'],['-', '-', '-'],['-', '-', '-'],];

  /**
   * @return {boolean}
   */
  checkForWin() {
    const grid = this.grid;

    for (let i = 0; i < 3; i++) {
      if (grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2] && grid[i][0] !== '-') return true;
    }

    for (let i = 0; i < 3; i++) {
      if (grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i] && grid[0][i] !== '-') return true;
    }

    if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2] && grid[0][0] !== '-') return true;

    if (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0] && grid[1][1] !== '-') return true;

    return false;
  }

  checkForATie() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.grid[i][j] === '-') return false;
      }
    }
    return true;
  }
}
