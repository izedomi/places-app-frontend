import React, {useEffect, useState} from 'react';
import {useHttpClient} from '../../shared/hooks/http-hook'

import UserList from '../components/userList/UserList';
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinnier/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElement/ErrorModal/ErrorModal'


const Users = () => {

    let {isLoading, error, sendRequest, cancelError} = useHttpClient();
    let [users, setUsers] = useState();

    useEffect(() => {

        const fetchUsers = async () => {

            const response = await sendRequest("http://localhost:5000/api/users")
            console.log(response)
            if(response.status)
               setUsers(response.data.users)
        }

        fetchUsers();

    }, [sendRequest]);

    return (

        <React.Fragment>

            <ErrorModal error={error} onClear={cancelError}/>

            {isLoading && <div className="center"><LoadingSpinner/></div>}

            {!isLoading && users && <UserList userList={users} />} 

        </React.Fragment>
       
    );
}


export default Users;
