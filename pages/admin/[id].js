import React,{useEffect,useState} from 'react'
import { MongoClient } from 'mongodb';


import axios from "axios"

function Profile(props) {
    const[students,setStudents]=useState([]);
    const[bookings,setBookings]=useState([])

    useEffect(async()=>{
        const result = await axios.get("/api/student")
        .then(res => { setStudents(res.data.data) })
        .catch(err => console.log(err))

        const bookings=await axios.get("/api/book_slot")
        .then(res => { setBookings(res.data.bookings)})
        .catch(err => console.log(err))
    },[])
    
    console.log(bookings)

    function renderTable(){
        
            return(
                <table style={{width: "70%",border: "2px solid red"}}>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                    {students.map(student => {
                        return(
                            <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td> 
                    
                  </tr>
                        );
                    })}
                </table>
            );
        
        
    }

    async function handleApprove(id){
        console.log("Approve clicked")
        console.log(id)
        
        const result = await axios.post(`/api/approve/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    async function handleReject(id){
        console.log("Reject CLicked")
        console.log(id)

        const result = await axios.post(`/api/reject/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    function renderBookings(){
        return(
            <table style={{width: "70%",border: "2px solid red"}}>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Time Slot</th>
                    <th>Day</th>
                    <th>Status</th>
                </tr>
                {bookings.map(booking => {
                    return(
                        <tr key={booking._id}>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.time_slot}</td> 
                <td>{booking.day}</td>
                <td><button onClick={()=>handleApprove(booking.book_id)}>Approve</button><button onClick={()=>handleReject(booking.book_id)}>Reject</button></td>
              </tr>
                    );
                })}
            </table>
        );
    }

    return (
        <div>
            
            <h1>Welcome {props.name}(Admin)</h1>
            
            
            {students.length === 0? "no students available": renderTable()}
            
            <h1>Bookings To Approve</h1>
            {bookings.length === 0? "no bookings available" : renderBookings()}
            
            
        </div>
    )
}

export async function getServerSideProps(req,res){
    const id=req.query.id;
    console.log(id)
    let client;
    try{
        client = await MongoClient.connect("mongodb+srv://admin-aamir:speed123@cluster0.qntvk.mongodb.net/usersDB?retryWrites=true&w=majority");
    }catch(error){
        res.status(422).json({ message: "User fetching failed"})
    }

    
    const db = await client.db();

    
    const user = await db.collection("users").findOne({ role: "admin"});
    

    // const bookings = await db.collection("bookings").find({},{_id:0}).toArray();
    // console.log(bookings)

    const props = { role : user.role, email : user.email, name : user.name};
    
     

    return{
        props
    }
}

export default Profile;