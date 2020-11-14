import React from 'react';
import Board from './Board';
import calculateWinner from './calculateWinner';
import Reset from "./reset";
import Square from "./Square";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history:[{
                squares: Array(9).fill(null),
            }],
            isNext:true,
            stepNumber:0
        };
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(squares[i] || calculateWinner(squares)){
            return ;
        }
        squares[i] = this.state.isNext ? '〇' : '☓';

        this.setState({history: history.concat([{
                squares: squares,
            }]),
            stepNumber:history.length,
            isNext:!this.state.isNext});
    }




    //status 勝者判定　出番判定
    arrayNullCheck(array){
        for (let i = 0; i < array.length; i++) {
            if (!array[i]){
                return false;
            }
        }
        return true;
    }

    arrayNullCheckReset(array){
        for (let i = 0; i < array.length; i++) {
            if (array[i]){
                return true;
            }
        }
        return false;
    }

    reset(){
        this.setState({history:[{
                squares: Array(9).fill(null),
            }],
            isNext:true,
            stepNumber:0});
    }

    renderReset(){
        const history = this.state.history;
        const current = history[history.length - 1];
        if(this.arrayNullCheckReset(current.squares)){
            return <Reset
                onclick={()=>this.reset()}/>;
        }
    }

    jumpTo(move){
        this.setState({stepNumber:move})
        if(move % 2 === 0){
            this.setState({isNext:true});
        }
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        let status;
        if(calculateWinner(current.squares)){
            status = this.state.isNext ? 'Winner player:☓' : 'Winner player:〇'  ;
        }else{
            status = this.state.isNext ? 'Next player:〇' : 'Next player:☓';
        }
        //drow処理
        if(!calculateWinner(current.squares) && this.arrayNullCheck(current.squares)){
            status = this.state.isNext = 'draw';
        }
        return (
            <div className="game">
                <div className="wrap">
                <div className="status">{status}</div>
                <div className="game-board">
                    <Board onClick={i => this.handleClick(i)}
                           squares={current.squares}/>
                </div>
                <div className="reset-button">
                    {this.renderReset()}
                </div>

                </div>

                <div className="history">
                    <ul>{moves}</ul>
                </div>



                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}


// ========================================
export default Game;
//ReactDOM.render(<Game />, document.getElementById("root"));

