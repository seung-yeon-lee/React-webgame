import React,{memo} from 'react';

//Functional Component

const Ball = memo(({number}) => {
    let background;

    if (number <= 10) {
        background = 'red'
    } else if (number <= 20) {
        background = 'orange';
    } else if (number <= 30) {
        background = 'yellow';
    } else if (number <= 40) {
        background = 'blue'
    } else {
        background = 'gray';
    }
    return (
        <div id='ball' style={{ background }}>{number}</div>
    )
 }
)
export default Ball;