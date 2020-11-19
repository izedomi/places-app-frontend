import {useCallback, useReducer} from 'react';


const formReducer = (state, action) => {

       
    switch(action.type){
       
        case "INPUT_CHANGE":

            let  isFormValid = true;

            for( const inputId in state.inputs){

                if(!state.inputs[inputId]){
                    continue;
                }
                if(action.inputId === inputId){
                    //inputId.value = action.value;
                    isFormValid = isFormValid && action.isValid
                    //console.log(inputId + " aa " + isFormValid);
                    
                }
                else{
                    //inputId.value = state.inputs.inputId.value;
                    isFormValid = isFormValid && state.inputs[inputId].isValid
                    //console.log(inputId + " bb " + isFormValid);
                   
                }
                //console.log(inputId + " " + isFormValid);
                //console.log(inputId + "xxxx " + state.inputs[inputId].isValid)
            }
            

            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {value: action.value, isValid: action.isValid}
                },
                isValid: isFormValid
            }

        case "SET_DATA":

            return {
                inputs: action.value,
                isValid: action.isValid
            }

           
        default:
            return state;
    }

}

const useForm = (initialState, initialFormValidity) => {

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialState,
        isValid: initialFormValidity
    });

    const onInputChangeHandler = useCallback((id, value, isValid) => {
        dispatch({type: "INPUT_CHANGE", value: value, isValid: isValid, inputId: id})
    }, [])


    const setFormData = useCallback((value, isValid) => {
        dispatch({type: "SET_DATA", value: value, isValid: isValid})
    }, []);


    return [formState, onInputChangeHandler, setFormData];
   

}

export default useForm;