
import React,{useState,useEffect} from "react";
import axios from "axios";

function Info(props) {
    const[bookings,setBookings]=useState([])
    useEffect(async()=>{
        const result = await axios.get(`/api/student/${props.email}`)
        .then(res => setBookings(res.data.bookings))
        .catch(err => console.log(err))
    },[])  

    console.log(bookings)

    function renderBookings(){
        return(
            <table style={{width: "70%",border: "2px solid red"}}>
                <tr>
                    <th>Name</th>
                    <th>Day</th>
                    <th>Time Slot</th>
                    <th>Status</th>
                    
                </tr>
                {bookings.map(booking => {
                    return(
                        <tr key={booking._id}>
                            <td>{booking.name}</td>
                            <td>{booking.day}</td>
                            <td>{booking.time_slot}</td>
                            <td>{booking.status}</td>
                        </tr>
                    );
                })}
            </table>
        );
    }
    return (
        <div>
            Am info of student

            {bookings.length === 0? "No bookings" : renderBookings()}
        </div>
    )
}

export async function getServerSideProps(req,res){
    const email= req.query.email;

    return{
        props:{
            email: email
        }
    }
}


export default Info;
