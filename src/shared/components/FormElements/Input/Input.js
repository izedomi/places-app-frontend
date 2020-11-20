import React, {useReducer, useEffect} from 'react';

import { validate} from '../../../../utils/validators'

import './Input.css';


const inputReducer = (state, action) => {
    
    switch(action.type){
        
        case "CHANGE":
            return {
                ...state,
                value: action.value,
                isValid: validate(action.value, action.validators)
            }
        case "TOUCH":
            return {
                ...state,
                isTouched: true
            }

        default:
            return state;
    
    }
   

}

const Input = (props) => {

    let [inputState, dispatch] = useReducer(inputReducer, {
        value: props.value || '', 
        isValid: props.valid || false, 
        isTouched: false
        //validators: props.validators
    } );
 
    const onChangeHandler = (event) => {
        dispatch({type: "CHANGE", value: event.target.value, validators: props.validators})
    }

    const onTouchedHandler = () => {
        dispatch({type: "TOUCH"})
    }

    const { id, onInput} = props;
    const {value, isValid} = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, onInput, value, isValid])
    


    let element = props.element === 'input' ? (
        <input
         type={props.type} 
         id={props.id} 
         placeholder={props.placeholder} 
         onChange={onChangeHandler}
         onBlur={onTouchedHandler}
         onInput={props.onInput}
         value={inputState.value} />
    ): (
        <textarea 
        id={props.id} 
        rows={props.rows || 3} 
        onChange={onChangeHandler}
        onBlur={onTouchedHandler}
        value={inputState.value}/>
    )
    return (

        <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
        
    );
}

export default Input;