import React,{useState} from 'react'
import {useRouter} from "next/router";

function Student() {
    const router=useRouter();
    const[student,setStudent]=useState({
        email: "",
        password: ""
    })
    
    function handleChange(e){
        
        setStudent({
            ...student,
            [e.target.name]: e.target.value
          })
    }

    async function handleClick(e){
        e.preventDefault();
        let role;
        let id;
        let name;
        await fetch("/api/student/",{
            method: 'POST',
            body:JSON.stringify(student),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            role=data.student.role
            id=data.student._id
            name=data.student.name
        });
        console.log(role)
        if(role === "student"){
            router.replace(`/student/${name}`)
            return;
        }
    }
    return (
        <div className="admin">
            <h1>Welcome Student</h1>
            <div className="admin_email">
            Email<input type="email" name="email" value={student.email} onChange={handleChange} />
            </div>

            <div className="admin_pass">
                Password<input type="password" name="password" value={student.password} onChange={handleChange} />
            </div>
            <div>
            
                 <button type="submit" className="admin_btn" onClick={handleClick}>Log In</button> 
            </div>
            
        </div>
    )
}

export default Student;
