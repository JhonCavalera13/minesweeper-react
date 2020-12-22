import React, { useEffect, useState } from 'react';
import createBoard from '../utils/createBoard';
import { revealed } from '../utils/reveal';
import Cell from './Cell';
import Modal from './Modal';
import Timer from './Timer';

export const Board = ({ row, col, bombs }) => {
    const [grid, setGrid] = useState([]);
    const [nonMineCount, setNonMineCount] = useState(0);
    const [mineLocations, setMineLocations] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        // Creating a board

        // Calling the function
        freshBoard();
    }, [row, col, bombs]);

    const freshBoard = () => {
        const newBoard = createBoard(row, col, bombs);
        setNonMineCount(row * col - bombs);
        setMineLocations(newBoard.mineLocation);
        setGrid(newBoard.board);
    };

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
    };

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // to not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newGrid = JSON.parse(JSON.stringify(grid));
        console.log(newGrid[x][y]);
        newGrid[x][y].flagged = true;
        setGrid(newGrid);
    };

    // Reveal Cell
    const revealCell = (x, y) => {
        if (grid[x][y].revealed || gameOver) {
            return;
        }
        let newGrid = JSON.parse(JSON.stringify(grid));
        if (newGrid[x][y].value === "X") {
            for (let i = 0; i < mineLocations.length; i++) {
                newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
            }
            setGrid(newGrid);
            setGameOver(true);
        } else {
            let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
            setGrid(newRevealedBoard.arr);
            setNonMineCount(newRevealedBoard.newNonMinesCount);
            if (newRevealedBoard.newNonMinesCount === 0) {
                setGameOver(true);
            }
        }
    };

    console.log(grid)

    return (
        <div>
            <Timer />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                }}
            >
                {
                    gameOver &&
                    <Modal restartGame={restartGame} />
                }

                {
                    grid.map((singleRow, index1) =>
                        <div style={{ display: "flex" }} key={index1}>
                            {
                                singleRow.map((singleBlock, index2) =>
                                    <Cell
                                        revealCell={revealCell}
                                        details={singleBlock}
                                        updateFlag={updateFlag}
                                        key={index2}
                                    />
                                )
                            }
                        </div>

                    )
                }

            </div>
        </div>
    )
}


{/* {grid.map((singleRow, index1) => {
                    return (
                        <div style={{ display: "flex" }} key={index1}>
                            {singleRow.map((singleBlock, index2) => {
                                return (
                                    <Cell
                                        revealCell={revealCell}
                                        details={singleBlock}
                                        updateFlag={updateFlag}
                                        key={index2}
                                    />
                                );
                            })}
                        </div>
                    );
                })} */}
