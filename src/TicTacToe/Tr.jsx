import React from 'react';
import Td from './Td'

const Tr = ({rowData,rowIndex,dispatch}) => {
    return(  //cellInDex = 몇번쨰 칸인지
        <tr>     
        {Array(rowData.length).fill().map((v,i) =>
        <Td dispatch={dispatch}rowIndex={rowIndex} cellIndex={i}
        cellData={rowData[i]}/>)}
        </tr>
    )
}
    
export default Tr;