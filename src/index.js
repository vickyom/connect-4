import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import checkDraw from "./helper/checkDraw";
import checkDiagonalLeft from "./helper/checkDiagonalLeft";
import checkVertical from "./helper/checkVertical";
import checkDiagonalRight from "./helper/checkDiagonalRight";
import checkHorizontal from "./helper/checkHorizontal";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player1: 1,
      player2: 2,
      currentPlayer: null,
      board: [],
      gameOver: false,
      message: "",
      showModal: false,
      player1_Name: "",
      player2_Name: "",
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // Bind play function to App component
    this.play = this.play.bind(this);
    sessionStorage.setItem("Player_1", 0);
    sessionStorage.setItem("Player_2", 0);
  }
  handleOpenModal() {
    this.setState({ showModal: true });
  }
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  }
  componentDidMount() {
    this.handleOpenModal();
  }
  handleCloseModal() {
    this.setState({ showModal: false });
    this.initBoard();
  }
  // Starts new game
  initBoard() {
    // Create a blank 6x7 matrix
    let board = [];
    for (let r = 0; r < 6; r++) {
      let row = [];
      for (let c = 0; c < 7; c++) {
        row.push(null);
      }
      board.push(row);
    }
    let cp = this.checkCurrentPlayer();
    console.log("CP = >", cp);
    this.setState({
      board,
      currentPlayer: cp,
      gameOver: false,
      message: "",
    });
  }
  checkCurrentPlayer() {
    switch (this.state.whoStart) {
      case "alf": // alternate
        return this.togglePlayer();

      case "lf": //loos first
        return this.state.player1;

      case "wf": //loos first
        return this.state.player1;

      case "ap1":
        return this.state.player1;

      case "ap2":
        return this.state.player2;

      default:
        break;
    }
  }

  togglePlayer() {
    return this.state.currentPlayer === this.state.player1
      ? this.state.player2
      : this.state.player1;
  }

  play(c) {
    if (!this.state.gameOver) {
      // Place piece on board
      let board = this.state.board;
      for (let r = 5; r >= 0; r--) {
        if (!board[r][c]) {
          board[r][c] = this.state.currentPlayer;
          break;
        }
      }
      // Check status of board
      let result = this.checkAll(board);
      if (result === this.state.player1) {
        let player1Stats = sessionStorage.getItem("Player_1")
          ? parseInt(sessionStorage.getItem("Player_1")) + 1
          : 0 + 1;

        this.setState({
          board,
          gameOver: true,
          message: "Player 1 (red) wins!",
        });
        sessionStorage.setItem("Player_1", player1Stats);
      } else if (result === this.state.player2) {
        let player2Stats = parseInt(sessionStorage.getItem("Player_2")) + 1;

        this.setState({
          board,
          gameOver: true,
          message: "Player 2 (yellow) wins!",
        });
        sessionStorage.setItem("Player_2", player2Stats);
      } else if (result === "draw") {
        this.setState({ board, gameOver: true, message: "Draw game." });
      } else {
        this.setState({ board, currentPlayer: this.togglePlayer() });
      }
    } else {
      this.setState({ message: "Game over. Please start a new game." });
      this.initBoard();
    }
    console.log("State == >", this.state);
  }

  checkAll(board) {
    return (
      checkVertical(board) ||
      checkDiagonalRight(board) ||
      checkDiagonalLeft(board) ||
      checkHorizontal(board) ||
      checkDraw(board)
    );
  }

  componentWillMount() {
    this.initBoard();
  }

  render() {
    return (
      <div className="wrapper">
        <div className="gameBoard">
          <table>
            <thead></thead>
            <tbody>
              {this.state.board.map((row, i) => (
                <Row key={i} row={row} play={this.play} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="gameStates">
          <span className="pl-head">{this.state.noOfGames} Tournament</span>
          <span className="pl-text">{this.state.message}</span>
          <div className="pl-layout">
            <div className="pl-details">
              <span>Player 1</span>
              <span>{this.state.p1}</span>
            </div>
            <div className="pl-details">
              <span>Score</span>
              <span>{sessionStorage.getItem("Player_1")}</span>
            </div>
          </div>
          <div className="pl-layout plyer2">
            <div className="pl-details">
              <span>Player 2</span>
              <span>{this.state.p2}</span>
            </div>
            <div className="pl-details">
              <span>Score</span>
              <span>{sessionStorage.getItem("Player_2")}</span>
            </div>
          </div>
          <p className="border"></p>
          <button
            className="button"
            onClick={() => {
              this.initBoard();
            }}
          >
            New Game
          </button>
          <button
            className="button"
            onClick={() => {
              this.handleOpenModal();
            }}
          >
            End Game
          </button>
        </div>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="New Game"
          className="Modal"
          overlayClassName="Overlay"
        >
          <div className="form-control">
            <input
              type="text"
              id="p1"
              placeholder="Player 1"
              name="p1"
              value={this.state.p1}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              placeholder="Player 2"
              id="p2"
              name="p2"
              value={this.state.p2}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-control custom-select-wrapper">
            <select
              name="noOfGames"
              id="noOfGames"
              onChange={this.handleChange}
            >
              <option value="">No of Games</option>
              <option value="2games">2 Games</option>
              <option value="3games">3 Games</option>
              <option value="5games">5 Games</option>
              <option value="10games">10 Games</option>
            </select>
          </div>
          <div className="form-control">
            <select name="whoStart" id="whoStart" onChange={this.handleChange}>
              <option value="alf">Alternative First</option>
              <option value="lf">Looser First</option>
              <option value="wf">Winner First</option>
              <option value="ap1">Aplways player 1</option>
              <option value="ap2">Aplways player 2</option>
            </select>
          </div>
          <div className="form-control">
            <button className="button" onClick={this.handleCloseModal}>
              Start Game
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

// Row component
const Row = ({ row, play }) => {
  return (
    <tr>
      {row.map((cell, i) => (
        <Cell key={i} value={cell} columnIndex={i} play={play} />
      ))}
    </tr>
  );
};

const Cell = ({ value, columnIndex, play }) => {
  let color = "white";
  if (value === 1) {
    color = "red";
  } else if (value === 2) {
    color = "yellow";
  }

  return (
    <td>
      <div
        className="cell"
        onClick={() => {
          play(columnIndex);
        }}
      >
        <div className={color}></div>
      </div>
    </td>
  );
};

ReactDOM.render(<App />, document.getElementById("main"));
