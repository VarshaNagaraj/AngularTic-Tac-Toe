import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  player1: string;
  player2: string;
  playButton:boolean=true;
  draw: boolean;
  board: Array<string>;

  boardSize: number;
  currPlayer: string;
  winner: string;
  constructor() {
    this.playButton=true;
    //this.reset();
  }

  onCellFunc(cellNum: number): void {
    if (!!this.winner || this.draw) return;
    if (this.board[cellNum]) return;

    // console.log(this.getCoords(cellNum));

    this.board[cellNum] = this.currPlayer;

    this.winner = this.checkWinFunc();
    if (!!this.winner) return;

    this.draw = this.checkDrawFunc(true);

    this.currPlayer = this.nextPlayer();
  }

  checkWinFunc(): string {
    for (let coord = 0; coord < this.boardSize; coord++) {
      //  horizontal check
      const rowMatch = this.charactedMatchFunc(this.boardLineFunc('row', coord));
      if (!!rowMatch) return rowMatch;

      //vertical  check 
      const colMatch = this.charactedMatchFunc(this.boardLineFunc('col', coord));
      if (!!colMatch) return colMatch;
    }
    //  diagonals check 
    let diagMatch = this.charactedMatchFunc(this.boardLineFunc('diag', 1));
    if (!!diagMatch) return diagMatch;
    diagMatch = this.charactedMatchFunc(this.boardLineFunc('diag', -1));
    if (!!diagMatch) return diagMatch;

    return '';
  }
boardLineFunc(direction: string, selector: number): Array<string> {
    // diagonal down  check 
    if (direction === 'diag' && selector < 0) {
      return this.board.filter((_, cellNum) => {
        const { row, col } = this.getCoordinates(cellNum);
        return row === col;
      });
    }
    // diagonal up check 
    if (direction === 'diag' && selector > 0) {
      return this.board.filter((_, cellNum) => {
        const { row, col } = this.getCoordinates(cellNum);
        return row + col + 1 === this.boardSize;
      });
    }
    // any row or column  check 
    return this.board.filter(
      (_, cellNum) => this.getCoordinates(cellNum)[direction] === selector,
    );
  }


  charactedMatchFunc(chars: Array<string>, charToMatch: string = chars[0]): string {
    return chars.every(char => char === charToMatch) ? charToMatch : '';
  }

  /**
   * @returns true if there is a draw, false otherwise
   */
  checkDrawFunc(alreadyCheckedWin: boolean = false): boolean {
    if (!alreadyCheckedWin && !!this.checkWinFunc()) return false;
    for (let index = 0; index < this.board.length; index++) {
      if (!this.board[index]) return false;
    }
    return true;
  }

 
  /**
   * @returns the character for the next player
   */
  nextPlayer(): string {
    return this.currPlayer === this.player1 ? this.player2 : this.player1;
  }

  currPlayerNumber(): number {
    return this.currPlayer === this.player1 ? 1 : 2;
  }

  /**
   * @param cellNum the number of the cell-calculate the grid coordinates of the given cell
   */
  getCoordinates(cellNum: number): { row: number; col: number } {
    return {
      row: Math.floor(cellNum / this.boardSize),
      col: cellNum % this.boardSize,
    };
  }
 
  resetGame(p1: string = 'S', p2: string = 'O', boardSize: number = 3): void {
    this.playButton=false;
    this.player1 = p1;
    this.player2 = p2;
    this.boardSize = boardSize;
    // TODO: set style variable of <app-board> inline?
    this.currPlayer = this.player1;
    this.winner = null;
    this.draw = false;
    this.board = new Array(this.boardSize * this.boardSize).fill('');
  }
}
