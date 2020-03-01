import React, {Component} from 'react';

const rspCoords={
    rock: '-137px',  //가위
    scissor: '0',   //바위
    paper: '-285px', //보
};
const scores ={
    rock: 1,
    scissor: 0,
    paper: -1,
};
const computerChoice = (imgCoord) =>{
    //Object.entries() 객체가 가지고있는 모든 프로퍼티를  key value 쌍으로 배열 형태로 반환시켜줌
    return Object.entries(rspCoords).find((v)=>{
        console.log(v[1])
        return v[1] === imgCoord;
    })[0]
}
export default class RSP extends Component{
    state={
        result:'',
        imgCoord:'0',
        score:'',
        fast:[],
        
    };
    
    Interval;

    changeHand =()=>{
        const {imgCoord} = this.state;
        if(imgCoord === rspCoords.scissor){
            this.setState({
                imgCoord: rspCoords.rock,
            });
        }else if(imgCoord === rspCoords.rock){
            this.setState({
                imgCoord:rspCoords.paper,
            });
        }else if(imgCoord === rspCoords.paper){
            this.setState({
                imgCoord: rspCoords.scissor
            })
        }  
    };  

    componentDidMount(){ // 컴포넌트가 첫 렌더링 된 후, (비동기 요청 시 )
      this.Interval = setInterval(this.changeHand, 1000)
    }
    componentDidUpdate(){ // 렌더링 후 setState,props등 바뀔 때 

    }
    componentWillUnmount(){ //컴포넌트가 제거되기 직전, 비동기 요청 정리
        clearInterval(this.Interval);
    }

    

    onClickBtn =(choice)=>{
        const {imgCoord} = this.state;
        // console.log(scores[choice])
        // console.log(scores[computerChoice(imgCoord)])
        clearInterval(this.Interval)
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if(diff === 0){
            this.setState({
                result:'비겼습니다.'
            });
        }else if([-1, 2].includes(diff)){
           //이겼다면 예전 점수 +1 이므로 예전 state값 함수형으로..
           this.setState((prevState)=>{
               return{
                   result:'이겼습니다!',
                   score: prevState.score + 1    // 다시 체크하기
               };
           });
        }else{
           this.setState((prevState)=>{
               return{
                   result:'졌습니다!',
                   score: prevState.score -1
               }
           }) 
        }
        setTimeout(()=>{
            this.Interval = setInterval(this.changeHand,1000)
        },2000)
     
      
    }
    

    render(){
        
        const{result,score,imgCoord} = this.state;
        return(
        <>
        <span>Rsp game</span>
        <div id="computer" 
        style={{background: 
        `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
        <div style={{paddingLeft:'20px'}}>
            <button id='rock' className='Btn' onClick={()=>this.onClickBtn('rock')}>
                가위
            </button>
            <button id='scissor'className='Btn' onClick={()=>this.onClickBtn('scissor')}>
                바위
            </button>
            <button id='paper' className='Btn' onClick={()=>this.onClickBtn('paper')}>
                보
            </button>
        </div>
        <div style={{paddingLeft:'30px',color:'skyblue'}}>{result}</div>
        <div style={{paddingLeft:'20px'}}>현재점수:<span style={{color:'blue', paddingLeft:'5px'}}>{score}</span>
        점
        </div>
     
  
    </>
        )
    }
}
