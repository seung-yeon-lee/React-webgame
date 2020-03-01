// import React, {Component} from 'react';

// const rspCoords ={
//     rock: '-137px',
//     scissor: '0',
//     paper: '-285px'
// };
// const scores ={
//     rock: 1,
//     scissor: 0,
//     paper: -1,
// };

// const computerChoice =()=>{
//     return Object.entries(rspCoords).find((v)=>{
//         return v[1] === imgCoord;
//     })[0];
// }



// export default class RSP extends Component{
//     constructor(props){
//         super(props);
//         this.state={
//             result:'',
//             imgCoord:'0',
//             score:'0',
//         };
//     }

//     Interval;
    
//   componentDidMount(){ //컴포넌트가 첫 렌더링 된 후( 비동기 요청)
//     this.Interval = setInterval(()=>{

//     })
//   }

//     render(){
//         const{result,score,imgCoord} = this.state;
//         return(
//     <>
//         <span>Rsp game</span>
//         <div id="computer" 
//         style={{background: 
//         `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
//         <div style={{paddingLeft:'20px'}}>
//             <button id='rock' className='Btn' onClick={()=>this.onClickBtn('가위')}>
//                 가위
//             </button>
//             <button id='scissor'className='Btn' onClick={()=>this.onClickBtn('바위')}>
//                 바위
//             </button>
//             <button id='paper' className='Btn' onClick={()=>this.onClickBtn('보')}>
//                 보
//             </button>
//         </div>
//         <div style={{paddingLeft:'30px',color:'skyblue'}}>{result}</div>
//         <div style={{paddingLeft:'20px'}}>현재점수: 
//         <span style={{color:'blue', paddingLeft:'5px'}}>{score}</span>점</div>
  
//     </>
//         )
//     }
// }
        
    
// const array = [1,2,3,4,5,6,7,8,9];
// for(let i = 0; i<array.length; i+=1){
//    if(array[i] % 2 === 0){
//        console.log('짝수는:',array[i])
//    }
// };

const array2 = [1,2,3,4,5,6,7,8,9];

array2.forEach((v)=>{
    if(v % 2 === 0){
        return v * 2
    }
    console.log(v)
})
    
