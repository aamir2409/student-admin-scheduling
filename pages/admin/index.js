import React,{useState} from 'react'
import {useRouter} from "next/router";


function Admin() {
    const router=useRouter();
    const[admin,setAdmin]=useState({
        email: "",
        password: ""
    })
    
    function handleChange(e){
        
        setAdmin({
            ...admin,
            [e.target.name]: e.target.value
          })
    }

    async function handleClick(e){
        e.preventDefault();
        let role;
        let id;
        await fetch("/api/admin/signin",{
            method: 'POST',
            body:JSON.stringify(admin),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            role=data.user.role
            id=data.user._id
        });
        console.log(role)
        if(role === "admin"){
            router.replace(`/admin/${id}`)
            return;
        }
    }
    return (
        <div className="admin">
            <h1>Welcome Admin</h1>
            <div className="admin_email">
            Email<input type="email" name="email" value={admin.email} onChange={handleChange} />
            </div>

            <div className="admin_pass">
                Password<input type="password" name="password" value={admin.password} onChange={handleChange} />
            </div>
            <div>
            
                 <button type="submit" className="admin_btn" onClick={handleClick}>Log In</button> 
            </div>
            
        </div>
    )
}

export default Admin;