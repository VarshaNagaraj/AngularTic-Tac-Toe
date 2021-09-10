import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {

  @Output() cellClick = new EventEmitter();
  @Input() board: Array<string>;
  @Input() players: Array<string>;
  showCellNums = false;

  checkPlayer(cellNum: number): number {
    return 1 + this.players.findIndex(player => player === this.board[cellNum]);
  }
}
