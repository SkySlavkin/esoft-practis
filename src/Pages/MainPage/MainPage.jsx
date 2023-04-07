import React, {useEffect, useState} from "react";
import classes from "./MainPage.module.scss";
import X from "../../resources/image/icon/X";
import O from "../../resources/image/icon/O";

const MainPage = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState("X");
    const [winner, setWinner] = useState(null);
    const [time, setTime] = useState(0);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return (
            <div className={classes.wrap}>
                {formattedMinutes}:{formattedSeconds}
            </div>
        );
    };

    useEffect(() => {
        let intervalId;

        if (!winner) {
            intervalId = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [winner]);

    const checkWinner = (board) => {
        const possibleWins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < possibleWins.length; i++) {
            const [a, b, c] = possibleWins[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return [a, b, c];
            }
        }

        return null;
    };

    const handleClick = (index) => {
        if (board[index] || winner) {
            return;
        }

        const newBoard = [...board];
        newBoard[index] = player;
        setBoard(newBoard);

        const newWinner = checkWinner(newBoard);
        if (newWinner) {
            setWinner(newWinner);
            return;
        }

        setPlayer(player === "X" ? "O" : "X");
    };

    const renderSquare = (index) => {
        const isWinnerX = winner && winner.includes(index) && player === "X";
        const isWinnerO = winner && winner.includes(index) && player === "O";

        return (
            <div
                className={`${classes.square} ${
                    isWinnerX ? classes["winner-x"] : ""
                } ${isWinnerO ? classes["winner-o"] : ""}`}
                onClick={() => handleClick(index)}
            >
                {board[index] === "X" ? (
                    <X />
                ) : board[index] === "O" ? (
                    <O />
                ) : null}
            </div>
        );
    };

    const renderStatus = () => {
        if (winner) {
            return (
                <div className={classes.msg}>
                    <span>Побеждает: </span> {player === "X" ? <X /> : <O />}
                </div>
            );
        }

        return (
            <div className={classes.msg}>
                <span>Ходит: </span> {player === "X" ? <X /> : <O />}
            </div>
        );
    };
    <O />;
    const handleReset = () => {
        setBoard(Array(9).fill(null));
        setPlayer("X");
        setWinner(null);
        setTime(0);
    };
    return (
        <div className={classes.main_page}>
            <div className={classes.left}></div>
            <div className={classes.center}>
                <div className={classes.timer}>{formatTime(time)}</div>
                <div>
                    <div className={classes.board}>
                        <div className={classes.row}>
                            {renderSquare(0)}
                            {renderSquare(1)}
                            {renderSquare(2)}
                        </div>
                        <div className={classes.row}>
                            {renderSquare(3)}
                            {renderSquare(4)}
                            {renderSquare(5)}
                        </div>
                        <div className={classes.row}>
                            {renderSquare(6)}
                            {renderSquare(7)}
                            {renderSquare(8)}
                        </div>
                    </div>
                    <div className={classes.status}>{renderStatus()}</div>
                </div>
                <button className={classes.myBtn}>
                    <div onClick={handleReset}>Сбросить игру</div>
                </button>
            </div>
            <div className={classes.right}></div>
        </div>
    );
};

export default MainPage;
