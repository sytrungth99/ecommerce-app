import React from 'react';
import { useSelector } from 'react-redux';

function Profile() {
    const auth = useSelector(state =>state.Auth)
    const {user} = auth
    console.log(user)
    return (
<div className ="profile_page">
           <div className ='col-left'>
               <h2 className ='title-profile'>User Profile</h2>
               <div className ='avatars'>
               <img className ='img-avatar' src ={user.avatar} alt='img-avatar'></img>
               </div>
               <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" defaultValue={user.username}
                    placeholder="Your name"  />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" defaultValue={user.email}
                    placeholder="Your email address" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input type="password" name="password" id="password"
                    placeholder="Your password"  />
                </div>
           </div>
        </div>
    );
}

export default Profile;