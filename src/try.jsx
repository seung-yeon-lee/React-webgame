import React,{ PureComponent, memo} from 'react';

// class Try extends PureComponent{
//     render(){
//         const {tryInfo} = this.props;
//         return(
//             <li>
//             <div>{tryInfo.try}</div>
//             <div>{tryInfo.result}</div>
//         </li> 
//         ); 
//     }
// }
// --- hooks로 변경 code ---



const Try = memo(({tryInfo}) => {
    
    return(
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
}
)


export default Try;
