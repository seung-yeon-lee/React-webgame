import React,{useState, useCallback, useContext, memo} from 'react';
import {TableContext} from './MineSearch'
import {START_GAME} from './MineSearch'

const Form = memo(() => {
    const [row, setRow] = useState(); //세로가 몇개될지
    const [cell, setCell] = useState(); //칸이 몇칸될지 (가로)
    const [mine,setMine] = useState();
    
    const {dispatch}= useContext(TableContext);

    const onChangeRow = useCallback((e) => {
        setRow(e.target.value)
    },[]);
    const onChangeCell = useCallback((e) => {
        setCell(e.target.value)
    },[]);
    const onChangeMine = useCallback((e) => {
        setMine(e.target.value)
    },[]);

    const onClickBtn = useCallback(()=>{  //context API 적용
        dispatch( {type:START_GAME,row,cell,mine})
    },[row,cell,mine]);
    return(
        <div>
            <input type="number" placeholder="가로" value={row} onChange={onChangeRow}/>
            <input type="number" placeholder="세로" value={cell} onChange={onChangeCell}/>
            <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine}/>
            <button onClick={onClickBtn}>Game Start!</button>
        </div>
    )
}
)
export default Form;