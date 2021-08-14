import {connectToDatabase} from "../../../helpers/db";

async function handler(req,res){

    if(req.method === "GET"){

    const email = req.query.email;
    console.log(email)
    let client;
    try{
        client = await connectToDatabase(); 
    }catch(error){
        res.status(422).json({ message: "User fetching failed"})
    }

    const db = await client.db();

    const bookings = await db.collection("bookings").find({ email: email}).toArray();
    console.log(bookings)

    res.status(200).json({ message: "Huuray got bookings", bookings: bookings})
    }
}

export default handler;