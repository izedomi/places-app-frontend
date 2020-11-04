import React from 'react';

import UserList from '../components/userList/UserList';


const Users = () => {

    const USERS = [
       {
            'id' : 'u1',
            'name': "Karl Max",
            'image': 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'places': 3
        },
        {
            'id' : 'u2',
            'name': "Jeni Kas",
            'image': 'https://images.pexels.com/photos/2659475/pexels-photo-2659475.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
            'places': 7
        },
        {
            'id' : 'u3',
            'name': "Tab Ings",
            'image': 'https://images.pexels.com/photos/5022408/pexels-photo-5022408.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
            'places': 1
        },
        {
            'id' : 'u4',
            'name': "Tab Ings",
            'image': 'https://images.pexels.com/photos/5022408/pexels-photo-5022408.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
            'places': 1
        }

    ]

    return (
        <UserList userList={USERS} />
    );
}


export default Users;
