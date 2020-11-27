import React from 'react';
import {Link} from 'react-router-dom';

import Avatar from '../../../shared/components/UIElement/Avatar/Avatar';
import Card from '../../../shared/components/UIElement/Card/Card';

import './UserItem.css';

const UserItem = (props) => {

    let user = props.user;

    return (

        <li className="user-item">       
         
            <Card className="user-item__content">
                <Link to={`/${user._id}/places`}>
                    <div className="user-item__image">

                        <Avatar image={`http://localhost:5000/${user.image}`} alt={user.name}/>
                    </div>
                    <div className="user-item__info">
                        <h2>{user.name}</h2>
                        <h3>
                            {user.places.length} {user.places.length === 1 ? 'place' : 'places'}
                        </h3>
                    </div>
                </Link>
            </Card>
        
        </li>
    );
}

export default UserItem;