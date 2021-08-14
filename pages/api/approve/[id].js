import { connectToDatabase } from "../../../helpers/db";

async function handler(req,res){
    let client;
    try{
        client= await connectToDatabase();
        
    } catch(error){
        res.status(500).json({ message: "Connecting to the database failed" });
        return;
    }

    if(req.method === "POST"){
        const id=req.query.id;
        console.log(id)

        const db = await client.db();
        let booking;
        try {
            booking = await db.collection("bookings").updateOne({book_id: id},{$set:{"status": "approved"}});
            
          } catch (err) {
            if (err) {
              res.status(422).json({message: "User doesnt exist!"});
              return;
            }
          }

        res.status(200).json({ message: "Hello got hit at approve", booking:booking})
    }
}

export default handler;