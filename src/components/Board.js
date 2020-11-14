import React from 'react';
import Square from './Square';
import calculateWinner from './calculateWinner';


class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    renderSquare(i) {
        return < Square value={this.props.squares[i]}
                        onClick = {() => this.props.onClick(i)}/>;
    }


    render() {
        const col = [0,1,2];
        const row = [0,1,2];
        return (
            <div>
                <div className="board">
                    {row.map(row => { return (
                            <div className="board-row">
                                {col.map(col => this.renderSquare(row * 3 + col))}
                            </div>
                            )
                        })}
                </div>
            </div>
        );
    }
}

export default Board;