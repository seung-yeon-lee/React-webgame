import React,{useCallback, useReducer} from 'react';
import Table from './Table'


const initialState = { // useReducer 를 사용할 경우  만들었던 state들을 묶어 둠.
    winner: '',
    turn: 'O',
    tableData: [ ['','',''], ['','',''], ['','',''] ]
}; 
const RESET = 'RESET';
export const SET_WINNER = 'SET_WINNER';  //모듈로 만들어서 다른 곳에서 사용하기 위해
export const CLICK_CELL = 'CLICK_CELL';
export const SET_TURN = 'SET_TURN';

const reducer = (state,action) => {  // 2개의 매게변수 , state를 어떻게 바뀔 지 적는 부분임
   switch(action.type){
       case SET_WINNER :
           return{
               ...state,  //기존 state 직접 바꾸는게 아니라 새로운 state를 만들어서 바뀌는 부분만 change
               winner: action.winner,
        };
       case CLICK_CELL: {
           const tableData = [...state.tableData]; // 기존 tableData를 얕은 복사
           tableData[action.row] = [...tableData[action.row]]; //td에 넣었던 줄을 다시 펴줌 (객체가있으면 얕은 복사를 해준다 개념)
           tableData[action.row][action.cell] = state.turn; //row,cell이 현재 턴이 됨
           return{
               ...state,
               tableData,
           };
       }
       case SET_TURN : {
           return{
               ...state,
               turn: state.turn === 'O' ? 'X' : 'O'
           }
       };
        case RESET:{
            return{
                state,
                tableData:[ ['','',''], ['','',''], ['','',''] ]
            }
        }
   }
};

const TicTacToe = () => {
    const [state,dispatch] = useReducer(reducer, initialState);

    const onClickTable = useCallback( () => { //action 객체가 되고 > dispatch하면 실행됨
       dispatch( {type: SET_WINNER, winner: '0'} ) // reducer 함수안에서 type = action.type, winner = action.winner 가 됨
    },[])
    
    const Reset = useCallback( ()=>{
        dispatch( {type: RESET})
    },[])

    return(
    <>
        <span>TicTacToe Component</span>
        <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch} />
        {state.winner &&<div>{state.winner}님의 승리</div>}
        <button onClick={Reset}>초기화</button>
    </>
    ) 
}

export default TicTacToe;


