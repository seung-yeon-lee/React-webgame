import React,{useCallback} from 'react';
import {CLICK_CELL, SET_TURN} from './TicTacToe'


const Td = ({rowIndex,cellIndex,dispatch,cellData}) => {
    const onClickTd = useCallback(() => {
        console.log(rowIndex,cellIndex);  //dispatch는 언제나 만들 수 있음 메인 화면에서 case add.
        dispatch( { type:CLICK_CELL, row: rowIndex , cell: cellIndex });
        dispatch( { type:SET_TURN }); //dispatch는 tictactoe에서 가지고있으므로 넘겨 받아야함
    },[])
    return(
        <td onClick={onClickTd}>{cellData}</td>
        
    )
}

export default Td;