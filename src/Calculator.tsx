import { useEffect, useState } from 'react';
import { operands, calculateRPNResult } from './calculator_functions';
import './Calculator.css';

function Calculator() { 

    const [display, setDisplay] = useState('');
    const [result, setResult] = useState('');
    const [nbOperators, setNbOperators] = useState(0);
    const [nbNumbers, setNbNumbers] = useState(0);
    const [endOperation, setEndOperation] = useState(false);
    const [getValue, setGetValue] = useState('');
    const [click, setClick] = useState(false);
    const [equal, setEqual] = useState(false);

    useEffect(() => {
        if(equal) {
            if(nbOperators + 1 === nbNumbers) {
                const stack = calculateRPNResult(display);
                setEqual(false);
                setResult(stack.toString());
                setEndOperation(true);
            }
        }
    } , [equal]);

    useEffect(() => {
        if(getValue) sendValue(getValue);
    }, [click]);

    const handleDisplay = (value: string) => {
        reset();   
        setGetValue(value);   
        setClick(!click);
    }

    const sendValue = (value: string) => {
        console.log(value)
        if(operands.has(value)) {
            setNbOperators(nbOperators + 1);
        } else {
            if(nbOperators > 0) return;
            if(value !== 'NEGATE') setNbNumbers(nbNumbers + 1);
        }
        setDisplay(display + value + ' ');
    }

    const reset = () => {
        if(endOperation) {
            setDisplay('');
            setResult('');
            setNbNumbers(0);
            setNbOperators(0); 
            setEndOperation(false);
        } 
    }

    const handleClearLastValue = () => {
        const values = display.trim().split(' ');
        const lastValue = values.pop();
       if(operands.has(lastValue as string)) {
           setNbOperators(nbOperators - 1);
       } else {
            setNbNumbers(nbNumbers - 1);
       }
       setDisplay(display.trim().slice(0, -1))
    }


  return (
    <table>
        <thead>
            <tr>
                <th colSpan={4}>
                    <div>{ display }</div>
                    <div>{ result }</div>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colSpan={3} onClick={() => handleDisplay('NEGATE')}>NEGATE</td>
                <td className="clear" onClick={handleClearLastValue}>C</td>
            </tr>
            <tr>
                <td onClick={() => handleDisplay('7')}>7</td>
                <td onClick={() => handleDisplay('8')}>8</td>
                <td onClick={() => handleDisplay('9')}>9</td>
                <td className='operator' onClick={() => handleDisplay('x')}>x</td>
            </tr>
            <tr>
                <td onClick={() => handleDisplay('4')}>4</td>
                <td onClick={() => handleDisplay('5')}>5</td>
                <td onClick={() => handleDisplay('6')}>6</td>
                <td className='operator' onClick={() => handleDisplay('-')}>-</td>
            </tr>
            <tr>
                <td onClick={() => handleDisplay('1')}>1</td>
                <td onClick={() => handleDisplay('2')}>2</td>
                <td onClick={() => handleDisplay('3')}>3</td>
                <td className='operator' onClick={() => handleDisplay('+')}>+</td>
            </tr>
            <tr>
                <td onClick={() => handleDisplay('0')}>0</td>
                <td className='equal' colSpan={3} onClick={() => setEqual(true)}>=</td>
            </tr>
        </tbody>
    </table>
  )
}

export default Calculator