import React, {Component} from 'react';
import Ball from './Ball';

function getNumbers(){
    console.log('getNumbers');
    const candidate = Array(45).fill().map((v,i)=> i + 1);
    const shuffle = [];
    while(candidate.length> 0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length),1)[0])  // 0~ 44 중에 1개를 뽑아서
    }
    const bonusNumber = shuffle[shuffle.length -1];
    const winNumbers = shuffle.slice(0, 6).sort((p,c)=> p-c);
    return [...winNumbers,bonusNumber]

} 

export default class lotto extends Component{
    state={
        winNumbers: getNumbers(),  //당첨 숫자들
        winBalls:[], // 랜덤한 숫자 6개가 들어가게 될 배열
        bonus: null,  //보너스 볼, 마지막 숫자가 들어가게 될 부분
        redo: false,
        service:'',
    };

timeouts = [];

runtimeouts = () => {
    const {winNumbers} = this.state;
    for(let i = 0; i<winNumbers.length -1; i++){
       this.timeouts[i]= setTimeout(() => {
        // console.log(this.timeouts[i])
            this.setState((prevState)=>{
                return{
                    winBalls:[...prevState.winBalls, winNumbers[i] ],
                    
                }
            });
        }, (i + 1)* 1000);
    }
    this.timeouts[6]=setTimeout(() => {
         console.log(this.timeouts[6])
       this.setState({
           bonus:winNumbers[6],
           redo:true,
           service:'보너스!'
       }) 
    }, 7000);
    
}

    componentDidMount(){
        this.runtimeouts()
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('didUpdate');
        if (this.state.winBalls.length === 0) {
          this.runtimeouts();
        }
        if (prevState.winNumbers !== this.state.winNumbers) {
          alert('로또 숫자를 다시 생성 합니다.')
        }
      }

    componentWillUnmount(){
        this.timeouts.forEach(v =>{
            clearTimeout(v)
        })
    }

    onClickRedo = () => { //한번 더 뽑을 시 기존 state 초기화
       this.setState({
           winNumbers: getNumbers(),
           winBalls:[],
           bonus:false,
           redo:false,
           service:''
       });
       this.timeouts= [];
    }

    render(){
    const {winBalls,bonus,redo,service} = this.state;
        return(
         <>
         <span>Lotto Component</span>
         <div>당첨 숫자</div>
         <div id="result">
             {winBalls.map((v)=> <Ball key ={v} number={v} />)}
         </div>
        <div>{service}</div>
         {bonus && <Ball number={bonus} />}
         {redo && <button onClick={this.onClickRedo}>한번 더!</button>}    
             
         </>
        )
    }
};