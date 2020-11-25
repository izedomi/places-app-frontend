import {useCallback, useState} from 'react';


export const useHttpClient = () => {


    let [isLoading, setIsLoading] = useState(false);
    let [error, setError] = useState();


    const sendRequest =  useCallback(async (url, method="GET", body=null, headers={}) => {
            setIsLoading(true);
            try{
    
                const response = await fetch(url, { method, body, headers});
    
                var responseData = await response.json();
    
                if(!response.ok){throw new Error(responseData.message);}
    
                setIsLoading(false)
    
                return {'status': true, 'data': responseData, 'error': null}
            }
            catch(e){
    
                setIsLoading(false)
                setError(e.message || 'Something went wrong. Please try again!')
    
                return {'status': false, 'data': null, 'error': error }
            }
        }, [error]);


    const cancelError = () => {
        setError(null);
    }

    return {isLoading, error, sendRequest, cancelError}
}