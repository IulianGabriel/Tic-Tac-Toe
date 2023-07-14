class TicTacToe {
  player = {
    playerX: "X",
    playerO: "O",
    currentPlayer: "X",
  };
  movesCounter = 0;
  tiles = document.querySelectorAll(".tile");
  xHover = document.querySelector(".x-hover");
  oHover = document.querySelector(".o-hover");
  showGameOver = document.querySelector(".game-over-area");
  showWinner = document.querySelector(".game-over-text");
  playAgainButton = document
    .querySelector(".play-again")
    .addEventListener("click", () => this.playAgain());
  xIndexPositions = [];
  oIndexPositions = [];
  isPlaying = false;
  winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  constructor() {
    this.addTilesFunctionality();
  }

  addTilesFunctionality() {
    this.isPlaying = true;
    this.tiles.forEach((tile) => (tile.isChecked = false));
    this.tiles.forEach((tile) => {
      tile.addEventListener("click", () => {
        const dataIndex = tile.dataset.index;
        this.addPlayersFunctionality(tile, dataIndex);
        tile.isChecked = true;
        this.removeHover(tile);
      });
    });
    this.tiles.forEach((tile) => {
      tile.addEventListener("mouseenter", () => {
        this.addMouseHover(tile);
      });
    });
  }

  addPlayersFunctionality(tile, dataIndex) {
    if (this.isPlaying && tile.textContent === "") {
      if (this.player.currentPlayer === this.player.playerX) {
        tile.textContent = this.player.playerX;
        this.xIndexPositions.push(Number(dataIndex));
        this.player.currentPlayer = this.player.playerO;
      } else if (this.player.currentPlayer === this.player.playerO) {
        tile.textContent = this.player.playerO;
        this.oIndexPositions.push(Number(dataIndex));
        this.player.currentPlayer = this.player.playerX;
      }
      this.movesCounter++;
      this.checkWin();
    }
  }

  checkWin() {
    let winner = null;
    this.winningCombinations.forEach((combination) => {
      if (combination.every((el) => this.xIndexPositions.includes(el))) {
        winner = this.player.playerX;
      } else if (combination.every((el) => this.oIndexPositions.includes(el))) {
        winner = this.player.playerO;
      }
    });

    if (winner !== null) {
      this.displayWinner("win", winner);
    } else if (this.movesCounter === 9) {
      this.displayWinner("draw", winner);
    }
  }

  displayWinner(status, winner) {
    this.showGameOver.classList.remove("hidden");
    status === "win"
      ? (this.showWinner.textContent = `The winner is ${winner}`)
      : (this.showWinner.textContent = "It's a draw!");
    console.log(status);
    this.isPlaying = false;
  }

  addMouseHover(tile) {
    this.removeHover(tile);
    if (
      this.player.currentPlayer === this.player.playerX &&
      tile.isChecked === false
    ) {
      tile.classList.add("x-hover");
    } else if (
      this.player.currentPlayer === this.player.playerO &&
      tile.isChecked === false
    ) {
      tile.classList.add("o-hover");
    }
  }

  playAgain() {
    this.player.currentPlayer = this.player.playerX;
    this.movesCounter = 0;
    this.xIndexPositions = [];
    this.oIndexPositions = [];
    this.showGameOver.classList.add("hidden");
    this.isPlaying = true;
    this.tiles.forEach((tile) => {
      tile.textContent = "";
    });
  }

  removeHover(tile) {
    tile.classList.remove("x-hover");
    tile.classList.remove("o-hover");
  }
}
const newTicTacToe = new TicTacToe();
