"use strict"

class Sudoku {
  constructor(board_string) {
    // this.input = board_string
    this.array = this.papan(board_string)
  }

  papan(input) {
    let arr = []
    let arrKecil = []

    for (let i = 0 ; i < input.length ; i++) {
      arrKecil.push(+input[i])
      if (arrKecil.length === 9) {
        arr.push(arrKecil)
        arrKecil = []
      }
    }

    return arr
  }

  solve() {
    let empty = this.searchEmpty(this.array)
    let row = empty[0]
    let col = empty[1]
    
    if (!this.searchEmpty(this.array)) {
      return this.array
    }

    for (let z = 1 ; z < 10 ; z++) {
      if (this.checkBoard(this.array, row, col, z)) {
        this.array[row][col] = z
        this.solve()
      }
    }

    if (this.searchEmpty(this.array)) {
      this.array[row][col] = 0
    }
    // return this.array
  }

  // Returns a string representing the current state of the board
  board() {
    let temp = []

    for (let i = 0 ; i < this.array.length ; i++) {
      let temp1 = ""
      for (let j = 0 ; j < this.array[i].length ; j++) {
        temp1 += `${this.array[i][j]} `
        if (temp1.length % 3 === 0) {
          temp.push(temp1)
          temp1 = ""
        }
      }
    }

    let boards = []
    let boardTemp = []

    for (let i = 0 ; i < temp.length ; i++) {
      boardTemp.push(temp[i])
      if (boardTemp.length === 3) {
        boards.push(boardTemp)
        boardTemp = []
      }
    }

    for (let i = 0 ; i < boards.length ; i++) {
      if (i=== 0 || i % 3 === 0) {
        console.log('---------------------')
      }
      console.log(boards[i].join("| "))
      if (i === boards.length - 1) {
        console.log('---------------------')
      }
    } 

    return this
  }

  searchEmpty(board) {
    for (let i = 0 ; i < board.length ; i++) {
      for (let j = 0 ; j < board[i].length ; j++) {
        if (board[i][j] === 0) {
          return [i, j]
        }
      }
    }
    return false
  }

  checkBoard(board, x, y, z) {
    for (let i = 0 ; i < board[x].length ; i++) {
      if (board[x][i] === z) {
        return false
      }
    }

    for (let i = 0 ; i < board.length ; i++) {
      if (board[i][y] === z) {
        return false
      }
    }

    let row = Math.floor(x / 3) * 3
    let col = Math.floor(y / 3) * 3
    for (let i = row ; i < row + 3 ; i++) {
      for (let j = col ; j < col + 3 ; j++) {
        if (board[i][j] === z) {
          return false
        }
      }
    }
    
    return true
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)
console.log(game)
// Remember: this will just fill out what it can and not "guess"
game.board()

game.solve()

game.board()
