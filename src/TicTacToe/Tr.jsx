import React,{useMemo,useRef,useEffect,memo} from 'react';
import Td from './Td'

const Tr = memo(({rowData,rowIndex,dispatch}) => {

    console.log('TR Rendering');
 
    const ref = useRef([]);
    useEffect( () => {
        console.log(rowData === ref.current[0],rowIndex === ref.current[1],
                    dispatch === ref.current[2]);

        ref.current = [rowData,rowIndex,dispatch]
    },[]);
    return(  //cellInDex = 몇번쨰 칸인지
        <tr>     
        {Array(rowData.length).fill().map((v,i) =>
        <Td key={i} dispatch={dispatch}rowIndex={rowIndex} cellIndex={i}
        cellData={rowData[i]}/>)
        }
        </tr>
    )
}
)


// return(  //cellInDex = 몇번쨰 칸인지
//     <tr>     
//     {Array(rowData.length).fill().map((v,i) =>
// useMemo( () => 
//     <Td key={i} dispatch={dispatch}rowIndex={rowIndex} cellIndex={i}
//     cellData={rowData[i]}></Td>
// ,[rowData[i]]
//     )
//     )}
// </tr>
// )
// }

    
export default Tr;