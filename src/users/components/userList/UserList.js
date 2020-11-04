import React from 'react';
import Card from '../../../shared/components/UIElement/Card/Card';

import UserItem from '../userItem/UserItem';

import './UserList.css';


const UserList = (props) => {

    if(props.userList.length === 0){
        return (
            <div className="center">
                <Card>
                    <h3> No User found!</h3>
                </Card>
            </div>
        );
    }

    return (
        <ul className="users-list">
            {
                props.userList.map((user) => {
                    return <UserItem user={user} key={user.id}/>
                })
            }
            
        </ul>
    );
}


export default UserList;