//  Class => Hooks로 변경한 code
import React, { useState, useRef, memo } from 'react';
import Try from './try'

//this를 쓰지 않는다면 class 밖에서 선언
const getNumbers = () => {
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i += 1) {
        const success = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(success);
    }
    return array;
}

const NumberBaseball = memo(() => {          
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const [tries, setTries] = useState([]);
    const [answer, setAnswer] = useState(getNumbers());
    const inputEl = useRef(null)

    const onSubmit = (e) => {
        e.preventDefault();
        if (value === answer.join('')) {
            console.log(getNumbers())
            setResult('HomeRun!');
            setTries((t) => ([
                ...t,   
                {
                    try: value,
                    result: 'HomeRun'
                }
            ]));
            alert('축하합니다! 게임을 다시 시작합니다.');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
            inputEl.current.focus();
        } else {
            const answerArray = value.split('').map(v => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 10) {
                setResult(`10번 이상 틀려서 실패! 정답은: ${answer.join('')}입니다.`)
                alert(`정답은: ${answer.join('')}게임을 초기화 합니다.`);
                setValue('');
                setAnswer(getNumbers());
                setTries([])
                inputEl.current.focus();
            } else {
                console.log('답은', answer.join(''));
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === answer[i]) {
                        console.log('strike', answerArray[i], answer[i]);
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        console.log('ball', answerArray[i], answer.indexOf(answerArray[i]));
                        ball += 1;
                    }
                }
                setTries((t) => {
                    return(
                        [...t, 
                            { try: value, result:`${strike} 스트라이크 ${ball} 입니다.`
                        }
                    ]
                    )
                })
                setValue('');
                inputEl.current.focus();
            }
        }
    };

    return (
        <div style={{borderBottom:'1px solid'}}>
            <span>Number Baseball games..</span>
            <h1>{result}</h1>
            <form onSubmit={onSubmit}>
                <input
                    ref={inputEl}
                    maxLength={4}
                    value={value}
                    placeholder='please the answer' 
                    onChange={(e) => setValue(e.target.value)}
                />
                <button>입력!</button>
            </form>
            <div>시도: {tries.length}</div>
            <ul>
                {tries.map((v, i) => (
                    <Try key={`${i + 1}: ${v.try}`} tryInfo={v} />
                ))}
            </ul>
        </div>
    );
}
);

export default NumberBaseball;











// import React, { Component } from 'react';
// import Try from './try'

// //this를 쓰지 않는다면 class 밖에서 선언
// function getNumbers(){
//     const candidate = [1,2,3,4,5,6,7,8,9];
//     const array = [];
//     for(let i = 0; i< 4; i+=1){
//         const success = candidate.splice(Math.floor(Math.random() *(9 -i)),1)[0];
//         array.push(success);
//     }
//     return array;
// }

// export default class NumberBaseball extends Component{            // class 기반 code  아래는 hooks
//     state = {  
//         value:'',
//         result: '',
//         tries:[],
//         answer: getNumbers(),
//     }

// onSubmit = (e) => {
//     const {value,tries,answer} = this.state;
//     console.log(answer)
//     e.preventDefault();
//     if(value === answer.join('')){ //맞았을 경우
//         this.setState((prevState)=>{
//             return {
//             result:'HomeRun!!',
//             tries: [...prevState.tries, {try:value, result:'홈런!'}]
//             }

//         });
//         alert('정답입니다! 게임을 다시 시작합니다.');
//         this.setState({
//             value:'',
//             answer: getNumbers(),
//             tries:[],
//         });


//     }else{ //틀렸을 경우
//         const answerArray = value.split('').map( v=> parseInt(v));
//         let strike = 0;
//         let ball = 0;
//          if(tries.length >= 10){  //10번 넘게 틀렸을 경우
//             this.setState({
//                 result: `10번 넘게 틀려서 실패! 답은
//                  ${answer.join(',')}입니다`
//             });
//             alert(`틀렸습니다 정답은: ${answer.join('')}`);
//             this.setState({
//                 value:'',
//                 answer: getNumbers(),
//                 tries:[],
//             });
//         }else{ 
//             for(let i = 0; i<4; i+= 1){  //스트라이크, 볼 판단 알고리즘
//                 if(answerArray[i] === answer[i]){
//                     strike += 1;
//                 }else if(answer.includes(answerArray[i])){
//                     ball += 1;
//                 }
//                 console.log(tries.length)
//             }
//             this.setState((prevState) =>{
//                 return{
//                 tries:[...prevState.tries,{try:`내 입력값은: ${value}`, result:`${strike}스트라이크, ${ball} 볼입니다`}],
//                 value: '',
//             }
//           })
//         }
//      };
//   };
// onChange = (e) => {
//     this.setState({
//         value: e.target.value,

//     })

// }
//     render(){
//       const {value,tries} = this.state;
//         return(
//         <>
//             <span>Number Baseball games..</span>

//             <form onSubmit = {this.onSubmit}>
//                 <input maxLength={4} 
//                 value={value} onChange={this.onChange} />
//                 <button>제출</button>
//             </form>
//             <div>시도: {tries.length}</div>
//             <ul>
//                 {tries.map((v,i,)=>{
//                     return(

//                         <Try tryInfo={v} index={i} key={`${i+ 1}차 시도:`} />
//                     )
//                 })}

//             </ul>
//         </>

//         )
//     }
// }     






 