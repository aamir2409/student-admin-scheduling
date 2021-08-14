import React from 'react'
import axios from "axios";
import { MongoClient } from 'mongodb';
import {useRouter} from "next/router";
import Link from 'next/link'


function Profile(props) {
    console.log(props.count)
    const router=useRouter();
    
    async function handleSubmit(event){
        event.preventDefault();

        var value = document.getElementById("time_slot").value;
        var day=document.getElementById("day").value;
        console.log(value)
        console.log(day)

        const slot_detail={
            name: props.name,
            email: props.email,
            id: props.id,
            time_slot: value,
            day: day,
            count: props.count
        }
        await fetch("/api/book_slot",{
            method: 'POST',
            body:JSON.stringify(slot_detail),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => console.log(data));

        router.replace(`/student/info/${props.email}`)
    }

    function renderBookSlot(){
        return(
            <div>
            <h1>Book Time Slot </h1>
            <form onSubmit={handleSubmit}>
  <label htmlFor="cars">Choose a Time:</label>
  <select name="day" id="day">
    <option value="Monday">Monday</option>
    <option value="Tuesday">Tuesday</option>
    <option value="Wednesday">Wednesday</option>
    <option value="Thursday">Thursday</option>
    <option value="Friday">Friday</option>
    <option value="Saturday">Saturday</option>
    <option value="Sunday">Sunday</option>
  </select>
  <select name="time_slot" id="time_slot">
    <option value="1pm-2pm">1pm-2pm</option>
    <option value="4pm-5pm">4pm-5pm</option>
    <option value="6pm-7pm">6pm-7pm</option>
  </select>
  <br></br>
  <input type="submit" value="Submit" />
</form>
</div>
        );
    }
    
    return (
        <div>
            {props.count === 2? "You cant book slot": renderBookSlot()}
            


        <div>
            <Link href={`/student/info/${props.email}`}>
                <button>Go to Student Info</button>
            </Link>
        </div>
        </div>
    )
}

export async function getServerSideProps(req,res){
    const name=req.query.name;
    console.log(name)

    let client;
    try{
        client = await MongoClient.connect("mongodb+srv://admin-aamir:speed123@cluster0.qntvk.mongodb.net/usersDB?retryWrites=true&w=majority");
    }catch(error){
        res.status(422).json({ message: "User fetching failed"})
    }

    const db = await client.db();

    
    const user = await db.collection("users").findOne({ name: name});
    console.log(user)
    const props = { role : user.role, email : user.email, name : user.name, id: user._id.toString(), count: user.slotcount};
    console.log(props) 

    return{
        props
    }
}



export default Profile;