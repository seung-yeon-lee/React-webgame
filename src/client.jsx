const React = require('react');
const ReactDOM = require('react-dom');
import WordRelay from './wordrelay'
import Functional from './functional'
import NumberBaseball from './baseball'
import ResponseCheck from './responseCheck'

const{hot} = require('react-hot-loader/root');

const Hot = hot(Functional);
const Relay= hot(WordRelay);
const Baseball = hot(NumberBaseball);
const Response = hot(ResponseCheck)

ReactDOM.render(<div><Hot /><Relay /><Baseball /><Response/></div>,document.querySelector('#root'))