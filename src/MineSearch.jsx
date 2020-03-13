import React, { useReducer, createContext, useMemo, useEffect } from 'react';
import Table from './Table'
import Form from './Form';

export const CODE = {
    MINE: -7,           // 지뢰가 심어진 칸
    NORMAL: -1,         // 정상인 빈 칸
    QUESTION: -2,       // 물음표(지뢰 우클릭)
    FLAG: -3,           // 깃발(지뢰 우클릭 2번 시)
    QUESTION_MINE: -4,  // 물음표이지만 그 칸이 지뢰가 있다면
    FLAG_MINE: -5,      // 깃발 칸에 지뢰가 있다면
    CLICKED_MINE: -6,   // 지뢰 칸을 클릭 했다면
    OPENED: 0,           // 정상적이게 칸을 연 경우(0이상이면 OPEN 되도록)
};

export const TableContext = createContext({
    tableData: [],
    stop: true,
    dispatch: () => { },
});

const initialState = {
    tableData: [],
    data: {
        row: 0,
        cell: 0,
        mine: 0,
    },
    timer: 0,
    result: '',
    stop: true,
    openedCount: 0,

};

// 지뢰칸 오른쪽 클릭 시 = 깃발 , 한번더 클릭 = 물음표 , 한번 더 클릭 = 다시 정상 빈칸
const plantMine = (row, cell, mine) => {
    // console.log(row,cell,mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });

    const shuffle = []; //0~99까지 숫자(배열)중에 지뢰갯수를 push
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]; // 가로 세로 정한 값에서 하나씩 뽑아서 shuflle에 push 
        shuffle.push(chosen); //shuffle에 몇번쨰 칸에 , 지뢰가 있는지 판별

    };
    const data = [];
    for (let i = 0; i < row; i++) { // 세로 10 *
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {  //가로 10 =
            rowData.push(CODE.NORMAL)   //정상적인 100칸(이차원배열 생성)
        }
    }

    for (let k = 0; k < shuffle.length; k++) {  //shuffle에 몇번째에 지뢰를 심을지 정해두었기 때문에
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell; //EX) 0.0 , 1,0 등등 판단
        data[ver][hor] = CODE.MINE;  //몇번쨰 줄 몇번쨰 칸인지 찾아서 지뢰를 심는 코드

    }

    return data;  //return  tableData에 심어짐
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL'
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const FLAG_CELL = 'FLAG_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                data: { //게임시작할떄 초기 데이터를 저장 (승패 여부)
                    row: action.row,
                    cell: action.cell,
                    mine: action.mine
                },
                openedCount: 0,
                tableData: plantMine(action.row, action.cell, action.mine),
                stop: false,
                timer: 0,
            };
            case OPEN_CELL: { 
                const tableData = [...state.tableData];
                //클릭한 칸만 불변성을 위해 새로운 객체로 만들었으나 옆칸들도 열기 위해서
                //모든 칸을 새로 만듬
                tableData.forEach((row,i)=>{
                    tableData[i] = [...row];
                });
            
            const checked = [];  //한번 계산 한 값은 다시 계산하지 않아야함(한번 캐싱해두기)
            let openedCount = 0;
            
            const checkAround = (row,cell) =>{ //내 기준으로 검사(주변들 칸)
                if(row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length){
                    //상하좌우 칸이 아닌 경우 filtering
                    return; 
                }
                if([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])){
                    return;  //이미 열린 칸 or 지뢰가 있는 칸은 안열리도록 막아줌
                }
                if(checked.includes(row + ',' + cell)){ //이미 검사한 칸 이라면
                    return;
                }else{
                    checked.push(row + ',' + cell) //검사 한 칸이 아니라면 체크후 push
                };
               
                let around = [
                    tableData[row][cell-1], tableData[row][cell +1]
                ];
                if(tableData[row - 1]){
                    around = around.concat([ // 내 윗줄이 있으면 윗줄 3칸을 검사 대상으로
                        tableData[row -1][cell -1],
                        tableData[row -1][cell] ,
                        tableData[row -1][cell +1],
                     ]);
                };
                if(tableData[row + 1]){
                  around = around.concat([ // 내 아랫줄이 있으면 아래줄 3칸을 검사
                        tableData[row +1][cell -1],
                        tableData[row +1][cell] ,
                        tableData[row +1][cell +1],
                  ]);
                }; //위에 작성한 8칸 중에서 지뢰 갯수를 카운트함.
                const count = around.filter(v =>  //주변에 지뢰가 있는지 판별 후 갯수 판단
                    [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
                    // console.log(around,count)
                    
                    if(count === 0){ // 지뢰 갯수가 0개라면 (재귀) 현재 빈칸이라면,
                      if(row>-1){
                        const near= [];
                      
                        if(row -1 > -1){ //맨 윗칸을 클릭한 경우 더이상 위가없기 떄문에 없애줌
                            near.push([row -1, cell -1]);
                            near.push([row -1, cell ]);
                            near.push([row -1, cell +1]);
                        }
                        near.push([row,cell -1]);
                        near.push([row,cell +1]);
            
                        if(row +1 < tableData.length){ //맨 아랫칸을 클릭한 경우 더 이상 아래칸이 없기때문에 없애짐
                            near.push([row +1, cell -1]);
                            near.push([row +1, cell]);
                            near.push([row +1, cell +1]);
                        }
                      near.forEach(n => { //있는 칸들만 주변 클릭
                        if(tableData[n[0]][n[1]] !== CODE.OPENED){ //콜스택이 터져서 필터링 작업
                            checkAround(n[0], n[1]); //주변 칸들이 닫혀있어야만 OPEN
                        }
                      })   
                    }
                  };
                    if (tableData[row][cell] === CODE.NORMAL) { // 내 칸이 닫힌 칸이면 카운트 증가
                        openedCount += 1
                    }
                    tableData[row][cell] = count;
                };
            checkAround(action.row, action.cell);
            let stop = false;
            let result = ''
            if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {//지뢰가 없는 칸 만큼 다 열었다면 (승리)
                stop = true;
                result = `${state.timer}초만에 승리하셨습니다`
            }
            return {
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                stop,
                result,
            };
        }
        case CLICK_MINE: { //폭탄을 눌렀다면
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE
            return {
                ...state,
                tableData,
                stop: true
            }
        };
        case FLAG_CELL: {  //칸에 깃발을 꼽는다면
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] = CODE.MINE) {  //깃발 자리에 폭탄이 있다면
                tableData[action.row][action.cell] = CODE.FLAG_MINE
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            };
        }
        case QUESTION_CELL: { //깃발이있는 상태에서 -> 물음표를 만드는 과정
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] = CODE.FLAG_MINE) { //깃발에 폭탄이있다면
                tableData[action.row][action.cell] = CODE.QUESTION_MINE //물음표 폭탄으로 변경
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData,
            };
        };
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] = CODE.QUESTION_MINE) { //물음표+지뢰 까지 같이있다면
                tableData[action.row][action.cell] = CODE.MINE;  //지뢰있는 칸으로
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION
            }
            return {
                ...state,
                tableData,
            }
        };
        case INCREMENT_TIMER:{
            return{
                ...state,
                timer: state.timer + 1
            }
        };
        default:
            return state;
    }
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, result, timer, stop } = state;

    const value = useMemo(() => ({ tableData, stop, dispatch }), [tableData, stop]) 
    // return 부분에 바로 적용하면 컴포넌트가 계속 리 렌더링 성능적으로 문제 그래서, 한번 cashing 

    useEffect( ()=> {
        let timer;
        if(stop === false){ //중단이 풀렸을 떄 게임 시작 타이머 적용
            timer = setInterval(() => {
                dispatch( {type:INCREMENT_TIMER} )
            }, 1000);
        }
        return() => {
            clearInterval(timer);
        }
    },[stop]);

    return (
        <TableContext.Provider value={value}>
            <span style={{ color: 'blue' }}>MineSearch Component</span>
            <Form />
            <div>경과시간: {timer}초</div>
            <Table />
            <div>{result}</div>

        </TableContext.Provider>
    )
}

export default MineSearch;



