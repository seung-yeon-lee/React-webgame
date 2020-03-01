// // class Component

// import React, { Component } from 'react';

// export default class ResponseCheck extends Component {
//     state = {
//         state: 'waiting',
//         message: '클릭해서 시작하세요.',
//         result: [],
//     }
//     timeout;
//     startTime;
//     endTime;

//     onClickScreen = () =>{
//         const{state} = this.state;
//         const timer = Math.floor(Math.random() * 1000) + 2000; 
//         if(state === 'waiting'){
//             this.setState({
//                 state:'ready',
//                 message: '초록색이 되면 클릭하세요'
//             });
//             this.timeout = setTimeout(()=>{ //settimeOut을 선언한 값에 넣어줌(초기화위해)
//                 this.setState({
//                     state:'now',
//                     message: '지금 클릭'
//                 });
//                 this.startTime = new Date()
//             }, timer); //2~3초 랜덤
            
//         }else if(state === 'ready'){ //급하게 눌렀을 시
//             clearTimeout(this.timeout);
//             this.setState({
//                 state:'waiting',
//                 message: '너무 빨리 클릭하셨습니다'
//             })
//         }else if(state === 'now'){ //반응속도 체크
//             this.endTime = new Date();
//             this.setState((prevState)=>{
//                 return{
//                 state:'waiting',
//                 message: '클릭해서 시작하세요',
//                 result:[...prevState.result, this.endTime - this.startTime]
//                 //이전 값에 push 마지막 시간 - 처음 누른 시간 = 반응속도 결과
//              }
             
//         })
       
//     }
//  };
//     onClicked = () => {
//         this.setState({
//             result:[],
//             message:'초기화 되었습니다. 다시 시작하세요'
//         })
//     };
//     renderAverage = () => {
//         const {result} = this.state;
//         return(
//             result.length === 0
//             ? null
//             : <><div>평균 시간:{result.reduce((a,c)=>a+c) /result.length}ms</div>
//             <button onClick={this.onClicked}>Reset</button>
//             </>
//         )     
//     }

//     render(){
//         const {state,message} = this.state;
//         return(
//         <>
//         <div id='screen'
//         className={state}
//         onClick={this.onClickScreen}>
//             {message}
//         </div>
//            {this.renderAverage()}
//     </>
//         )
//     }
// };   


// hooks Component

import React,{useState,useRef} from 'react';

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message,setMessage] = useState('클릭해서 시작하세요!');
    const [result,setResult] = useState([]);
    const timeOut = useRef(null);
    const startTime = useRef(null);
    const endTime = useRef(null);

    const onClickScreen = () => {
        const timer = Math.floor(Math.random() * 1000) + 2000;
        if(state ==='waiting'){
            setState('ready');
            setMessage('초록색이 되면 클릭하세요');
            timeOut.current = setTimeout(()=>{
                setState('now');
                setMessage('지금 클릭하세요!');
                startTime.current = new Date();
            }, timer)
        }else if(state === 'ready'){
            clearTimeout(timeOut.current);
            setState('waiting');
            setMessage('너무 빨리 클릭하셨습니다');
        }else if(state === 'now'){
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요');
            setResult((prevState)=>{
                console.log(endTime.current,':')
               return(
                   [...prevState, endTime.current - startTime.current]
               )
            });
        };
    };

     const renderAverage = () => {
         console.log(result)
         return(
             result.length === 0
             ? null
             : <> <div>평균 시간:
                 {result.reduce((a,c) => a+c) / result.length}ms</div> 
                 <button onClick ={onClicked}>Reset</button>    
             </>
         );    
     };

     const onClicked = () => {
         setResult([]);
         setMessage('초기화 되었습니다 다시 시작하세요')
     }

    return(
     <div style={{borderBottom:'1px solid'}}>
     <div style={{paddingLeft:'70px',
    marginBottom:'5px'}}>반응속도 체크 example</div>
     <div id="screen"
     className={state} onClick={onClickScreen}>
        {message}
     </div>
        {renderAverage()} 
    </div>
    )
}
export default ResponseCheck;