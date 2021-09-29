import axios from 'axios';
import React, { useEffect, useState } from 'react';

function UserEdit() {
    const [users,setUsers] = useState([])
    const token = localStorage.getItem('fistItem')

    useEffect(()=>{
        const getUsers = async()=>{
            try{
                const res = await axios.get('/api/getall',{headers:{Authorization:token}})
                setUsers(res.data)
            }catch(err){
                console.log(err)
            }
        }
        getUsers()
    },[])
    return (
        <div className="history-page">
        <h2>User edit</h2>

        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>role</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(items => (
                        <tr key={items._id}>
                            <td>{items.username}</td>
                            <td>{items.email}</td>
                            <td>{items.role}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
    );
}

export default UserEdit;