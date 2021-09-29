import axios from 'axios';
import React, { useEffect, useState } from 'react';



function History() {
    const [histories,setHistories] = useState([])
    console.log('history',histories)
    useEffect(()=>{
        const getHistory = async()=>{
            try{
                const res = await axios.get('/api/history')
                setHistories(res.data)
            }catch(err){
                console.log(err)
            }
        }
        getHistory()
    },[])
    return (
        <div className="history-page">
        <h2>History</h2>

        <table>
            <thead>
                <tr>
                    <th>Full name</th>
                    <th>Phone number</th>
                    <th>Product name</th>
                </tr>
            </thead>
            <tbody>
                {
                    histories.map(items => (
                        <tr key={items._id}>
                            <td>{items.name}</td>
                            <td>{items.sdt}</td>
                            <td>{items.product}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
    );
}

export default History;