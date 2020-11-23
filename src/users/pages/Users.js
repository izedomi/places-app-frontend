import React, {useEffect, useState} from 'react';

import UserList from '../components/userList/UserList';
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinnier/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElement/ErrorModal/ErrorModal'


const Users = () => {

    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState();
    let [users, setUsers] = useState();

    useEffect(() => {

        const sendRequest = async () => {

            try{

                const response = await fetch("http://localhost:5000/api/users");
                const responseData = await response.json();
                
                if(!response.ok){
                    throw new Error(responseData.message);
                }

                //console.log(responseData.users);
    
               setUsers(responseData.users);
            }
            catch(e){
                setError(e.message);
            }

            setIsLoading(false)
          
        }

        sendRequest();
    }, []);


    const removeErrorModal = () => {
        setError(null);
    }

    return (

        <React.Fragment>

            <ErrorModal error={error} onClear={removeErrorModal}/>

            {isLoading && <div className="center"><LoadingSpinner/></div>}

            {!isLoading && users && <UserList userList={users} />} 

        </React.Fragment>
       
    );
}


export default Users;
