import React,{useCallback, useReducer,useEffect} from 'react';
import Table from './Table'


const initialState = { // useReducer 를 사용할 경우  만들었던 state들을 묶어 둠.
    winner: '',
    turn: 'O',
    tableData: [ ['','',''], ['','',''], ['','',''] ],
    saveCell : [-1, -1],
}; 
export const SET_WINNER = 'SET_WINNER';  //모듈로 만들어서 다른 곳에서 사용하기 위해
export const CLICK_CELL = 'CLICK_CELL';
export const SET_TURN = 'SET_TURN';
export const RESET_GAME = 'RESET_GAME';

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
               saveCell: [action.row, action.cell],
           };
       }
       case SET_TURN : {
           return{
               ...state,
               turn: state.turn === 'O' ? 'X' : 'O'
           }
       };
       case RESET_GAME :{
            return{
                ...state,
                turn: 'O',
                tableData: [ ['','',''], ['','',''], ['','',''] ],
                saveCell : [-1, -1],
            }
       }
       default:
           return state;
   }
};
const TicTacToe = () => {
    const [state,dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, saveCell} = state;

    // const onClickTable = useCallback( () => {
    //      //action 객체가 되고 > dispatch하면 실행됨
    //    dispatch( {type: SET_WINNER, winner: '0'} ) // reducer 함수안에서 type = action.type, winner = action.winner 가 됨
    // },[])

    useEffect(() => {
        const [ row,cell] = saveCell;
        if(row < 0){
           return;
        };

        let Win = false;

        if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn){
            Win = true;
        }
        if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell]=== turn){
            Win = true;
        }
        if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn){
            Win = true;
        }
        if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn){
            Win = true;
        }
        // console.log('Win:',Win, 'cell:',cell, 'row:',row, 'tableData:', tableData)

        if(Win){
            dispatch( {type:SET_WINNER, winner:turn})
            dispatch( {type:RESET_GAME});
        }else{
            let all = true; //칸이 다 차있다면 무승부
            tableData.forEach((row)=>{ // 무승부 검사
                // console.log(row)
                row.forEach((cell) =>{
                //   console.log('cell:',cell)
                    if(!cell){
                        all = false;
                    }
                });
            });
            if(all){  //무승부라면
                dispatch( {type:RESET_GAME});
            }else{
                dispatch( { type:SET_TURN });  //무승부가 아니면 next turn;
            }
          
        }
    },[saveCell]);

    return(
    <>
        <span>TicTacToe Component</span>
        <Table tableData={tableData} dispatch={dispatch} />
        {winner &&<div>{winner}님의 승리</div>}
    </>
    ) 
};

export default TicTacToe;


