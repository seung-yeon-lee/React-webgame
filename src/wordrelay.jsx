// const React = require('react');
// const {Component} = React;

// class WordRelay extends Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             word: '리액트',
//             value: '',
//             result: '',  
//         };
//     }

// onSubmit = (e) => {
//     e.preventDefault();
//     if(this.state.word[this.state.word.length -1] === this.state.value[0]){
//         this.setState({
//             word: `${this.state.value}`,
//             result: `Success!!`,
//             value: '',
            
//         })
//         this.InputRef()
//     }else{
//         this.setState({
//             result: 'Error!!',
//             value :'',
//         })
//     };
//     if(this.state.value.length <= 1 || this.state.value.length > 3){
//         this.setState({
//             result:'최소 2글자 이상 / 최대 3글자 까지만 허용 가능합니다.',
//             word: this.state.word
//         })
//     }
 
// }

// onChange = (e) => {
//     this.setState({ value : e.target.value})
// }

// InputRef = (c) => {
//     this.Input = c;
// }

// input;
//     render(){
//         return(
//          <div style={{borderBottom:'1px solid'}}>
//             <p>This is a WordRelay Game (Class Component)</p>
//             <span>{this.state.word}</span>
//             <form onSubmit={this.onSubmit}>
//                 <input type="text" onChange={this.onChange} 
//                 ref={this.InputRef} 
//                 placeholder='please the answer' 
//                 value={this.state.value}
//                 />
//                 <button>Submit</button>
//                 <p>{this.state.result}</p>
//             </form>
            
//      </div>

//         );
//     }
// }

// module.exports = WordRelay;


// hooks version WordRelay....

import React,{useRef,useState,memo} from 'react'

const WordRelay = memo(() => {
    const [word, setWord] = useState('리액트');
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const InputRef = useRef(null)

    const onSubmit = e => {
        e.preventDefault();

        (word[word.length -1] === value[0]) 
        ? `${setResult('Success!')} ${setValue('')} ${setWord(value)}`
        : `${setValue('')} ${setResult('Error!')}`
        
      if(value.length <= 1 || value.length>3 ){
        setResult('최소 2글자 최대 3글자 까지 입력 가능합니다.')
        setWord(word)
    } 
   
    }
    const onChange = (e) => {
        setValue(e.target.value);
    }

        return(
         <div style={{borderBottom:'1px solid'}}>
            <p>This is a WordRelay Game Hooks Component)</p>
            <span>{word}</span>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} 
                ref={InputRef} 
                placeholder='please the answer' 
                value={value}
                maxLength='3'
                />
                <button>Submit</button>
                <p>{result}</p>
            </form>  
     </div>
        )}
)
        
  export default  WordRelay