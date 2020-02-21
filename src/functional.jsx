import React,{useState,useRef,memo} from 'react'

const Functional = memo(() => {
    const [first,setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second,setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result,setResult] = useState('');
    const [count, setCount] = useState(0);
    const InputRef = useRef(null)
    
const onSubmit = e => {
    e.preventDefault();
    if(parseInt(value) === first * second) {
        setFirst(Math.ceil(Math.random() * 9));
        setSecond(Math.ceil(Math.random() * 9));
        setValue('');
        setResult(`Success ${value}`);

    }else{
        setValue('');
        setResult(`${value} : Error!!`)
    }
    
}
const onChange = e =>{
  setValue(e.target.value)
}
    
    return(
        <div>
            <div style={{paddingBottom:'30px', borderBottom:'1px solid'}}>
            <span>This is a Functional Component(React. Hooks)</span>
            <div>{first} * {second}</div>
            <form onSubmit={onSubmit}>
                <input value={value} 
                onChange={onChange} ref={InputRef} maxLength='3'
                placeholder='please the answer' 
                />
                
                <button>제출</button>
            </form>
            <span>{result}</span>
            </div>
        <div style={{paddingTop:'20px', borderBottom:'1px solid'}}>
            현재 카운터는 {count} 입니다.
            <p>
            <button onClick={ () => {setCount(count + 1)}}>+1</button>
            <button onClick={ () => {setCount(count -1)}}>-1</button>
            <button onClick={ () => {setCount(count * 2)}}>*2</button>
            <button onClick={ () => {setCount(count / 2)}}>/2</button>
            <button onClick={ () => {setCount(0)}}>Reset</button>
            </p>
        </div>
        </div>
    )
}
)

export default Functional;

