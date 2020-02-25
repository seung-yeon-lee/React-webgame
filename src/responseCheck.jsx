import React, { Component } from 'react';

export default class ResponseCheck extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: [],
    }
    timeout;
    startTime;
    endTime;

    onClickScreen = () =>{
        const{state} = this.state;
        const timer = Math.floor(Math.random() * 1000) + 2000; 
        if(state === 'waiting'){
            this.setState({
                state:'ready',
                message: '초록색이 되면 클릭하세요'
            });
            this.timeout = setTimeout(()=>{ //settimeOut을 선언한 값에 넣어줌(초기화위해)
                this.setState({
                    state:'now',
                    message: '지금 클릭'
                });
                this.startTime = new Date()
            }, timer); //2~3초 랜덤
            
        }else if(state === 'ready'){ //급하게 눌렀을 시
            clearTimeout(this.timeout);
            this.setState({
                state:'waiting',
                message: '너무 빨리 클릭하셨습니다'
            })
        }else if(state === 'now'){ //반응속도 체크
            this.endTime = new Date();
            this.setState((prevState)=>{
                return{
                state:'waiting',
                message: '클릭해서 시작하세요',
                result:[...prevState.result, this.endTime - this.startTime]
             }
        })
    }
 };

    renderAverage = () => {
        const {result} = this.state;
        return(
            result.length === 0
            ? null
            : <div>평균 시간:{result.reduce((a,c)=>a+c) /result.length}ms</div>
        )     
    }

    render(){
        const {state,message} = this.state;
        return(
        <>
        <div id='screen'
        className={state}
        onClick={this.onClickScreen}>
            {message}
        </div>
           {this.renderAverage()}
    </>
        )
    }
};