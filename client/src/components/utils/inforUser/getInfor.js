import React from 'react';
import './getInfor.css';
function getInfor(props) {
    return (
        <div className ="infor_page">
            <h2>Check out</h2>
            <form>
                    <div className ='getinfor'>
                        <label>Full name</label>
                        <input type ='text' name ='email' id ='email' placeholder ='Enter full name'  />
                    </div>
                    <div className ='getinfor'>
                        <label>Email</label>
                        <input type ='text' name ='email' id ='email' placeholder ='Enter email address'  />
                    </div>
                    <div className ='getinfor'>
                        <label>Phone number</label>
                        <input type ='text' name ='email' id ='email' placeholder ='Enter telephone number'  />
                    </div>
                    <div>
                       <button type ='submit'>Buy now</button>
                    </div>
            </form>
        </div>
    );
}

export default getInfor;