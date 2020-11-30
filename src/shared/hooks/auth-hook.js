import {useCallback, useEffect, useState} from 'react';


const useAuth = () => {


    let [userId, setUserId] = useState(null);
    let [token, setToken] = useState(null)

   
   
    const login = useCallback((uid, token, expirationD) => {
        setUserId(uid)
        setToken(token)
       
        const expirationDate = expirationD || new Date(new Date().getTime() + 1000 * 60 * 60);
        // console.log(expirationD)
        // console.log(new Date(new Date().getTime() + 1000 * 60 * 60))
        // console.log(expirationDate)
        localStorage.setItem(
            "userData",
            JSON.stringify({userId: uid, token: token, expiration: expirationDate.toISOString()})
        )
    }, [])

    const logout = useCallback((uid) => {
        setUserId(null)
        setToken(null)
        localStorage.removeItem("userData")
    }, [])

    useEffect(() => {
        
        const storedData = JSON.parse(localStorage.getItem("userData"))
     
        if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
            login(storedData.userId, storedData.token, new Date(storedData.expiration))
        }
        
    }, [login])

    return {userId, token, login, logout}

}

export default useAuth;

