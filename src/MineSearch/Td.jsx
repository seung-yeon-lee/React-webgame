import React, {useContext, useCallback,memo, useMemo} from 'react'
import { TableContext, OPEN_CELL, QUESTION_CELL } from './MineSearch';
import {CODE,CLICK_MINE,FLAG_CELL, NORMALIZE_CELL} from './MineSearch'

const getTdStyle = (code) => {
    switch(code){
        case CODE.NORMAL:
        case CODE.MINE:
            return{
                background: 'gray'
            };
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return{
                background: 'white'
            };
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return{
                background: 'yellow'
            };
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return{
                background:'red'
            }
        default:
            return{
                background:'white'
            }
    }
}

const getTdText = (code) => {
    switch(code){
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑!';
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return '!'   // 느낌표가 깃발 
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?';
        default:
            return code || '';
    }
};

const Td = memo(({rowIndex,cellIndex}) => {
    const {tableData, dispatch, stop} = useContext(TableContext);

    const onClickTd = useCallback( () => {
        if(stop){
            return;
        };
        switch(tableData[rowIndex][cellIndex]){ //data별 구분해두기
            case CODE.OPENED: //이미 열려있는 칸
            case CODE.QUESTION: //물음표 칸
            case CODE.FLAG: // 깃발
            case CODE.FLAG_MINE: //깃발에 지뢰일 경우
            case CODE.QUESTION_MINE: // 물음표에 지뢰일 경우
                return; //아무 효과없이 return (클릭이 안되게)

            case CODE.NORMAL: //보통 열려있는 칸 이라면
                dispatch( {type:OPEN_CELL, row: rowIndex, cell:cellIndex} );
                return;
            case CODE.MINE: // 지뢰를 클릭했다면
                dispatch( {type:CLICK_MINE, row:rowIndex, cell:cellIndex} );
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex],stop]);  //data는 계속 바뀌기 떄문에 추가

    const onRightClickTd = useCallback((e)  => {
        e.preventDefault()  //우측 클릭 시 메뉴뜨는걸 방지
        if(stop){
            return;
        }
        switch(tableData[rowIndex][cellIndex]){
            case CODE.NORMAL:
            case CODE.MINE:  //기본칸,지뢰칸에 깃발을 꼽으러면
                dispatch( {type:FLAG_CELL, row: rowIndex, cell: cellIndex} ); 
                return;
            case CODE.FLAG:  //깃발이 있는 칸 인 경우라면
            case CODE.FLAG_MINE: // 우측 한번 더 누를 시 깃발 > 물음표로 변경 하기 위해
                dispatch( {type:QUESTION_CELL, row: rowIndex, cell: cellIndex} );
                return;
            case CODE.QUESTION:
            case CODE.QUESTION_MINE: // 물음표 칸에서 다시 정상인 칸으로 바꾸기 위한 코드
                dispatch( {type:NORMALIZE_CELL, row: rowIndex, cell: cellIndex} );
                return;
              
            default:
                return;
        }

    },[tableData[rowIndex][cellIndex],stop ]);

    return useMemo(() =>( //함수자체가 실행이 되더라도 리턴 부분만 캐싱해주면 성능해결
      <td 
      style={getTdStyle(tableData[rowIndex][cellIndex])}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}  //마우스 오른쪽 클릭시 이벤트
      >{getTdText(tableData[rowIndex][cellIndex])} 
      </td>
    ), [tableData[rowIndex][cellIndex]]);  //바뀌는 값만 넣어주기
});

export default Td;



// return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]} />

// const RealTd = memo(({onClickTd,onRightClickTd,data}) => {
//     return(
//         <td 
//       style={getTdStyle(tableData[rowIndex][cellIndex])}
//       onClick={onClickTd}
//       onContextMenu={onRightClickTd}  //마우스 오른쪽 클릭시 이벤트
//       >{getTdText(tableData[rowIndex][cellIndex])} 
//       </td>
//     )
// })  //컴포넌트 쪼개는 방법