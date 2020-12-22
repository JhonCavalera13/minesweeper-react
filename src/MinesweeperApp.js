import React, { useEffect, useState } from 'react'
import { Board } from './components/Board'
import Swal from "sweetalert2";
export const MinesweeperApp = () => {

  const [row, setRow] = useState(10);
  const [col, setCol] = useState(15);
  const [bomb, setBomb] = useState(15);

  useEffect(() => {
    modal()
  }, [])


  const modal = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Indicate board size',
      html:
        '<input type="number" id="swal-input1" class="swal2-input" placeholder="Rows">' +
        '<input type="number" id="swal-input2" class="swal2-input" placeholder="Columns">' +
        '<input type="number" id="swal-input3" class="swal2-input" placeholder="Bombs">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
          document.getElementById('swal-input3').value
        ]
      }
    })

    if (formValues) {
      let row = Number(formValues[0]);
      let col = Number(formValues[1]);
      let bomb = Number(formValues[2]);

      if (row > 0 && col > 0 && bomb > 0) {
        setRow(row)
        setCol(col)
        setBomb(bomb)
      }
      else {
        Swal.fire('Default size board')
      }
    }
    else {
      Swal.fire('Default size board')
    }

  }

  return (
    <div>
      <center>
        <h3>
          MinesweeperApp
        </h3>
      </center>
      <Board
        row={row}
        col={col}
        bombs={bomb}
      />
    </div>
  )
}
