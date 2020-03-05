import React from 'react';
import Tr from './Tr'

const Table = ({tableData,dispatch}) => {
    
    return(    //rowIndex = 몇번쨰 줄인지 (i);
        <table>   
            {Array(tableData.length).fill().map((tr, i) => 
            <Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />)}
            
        </table>
                
    )
}
    
export default Table;  
