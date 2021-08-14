import {connectToDatabase} from "../../helpers/db";
import { v4 as uuidv4 } from 'uuid';

async function handler(req,res){
    

    let client;
    try{
        client= await connectToDatabase();
        
    } catch(error){
        res.status(500).json({ message: "Connecting to the database failed" });
        return;
    }

    if(req.method === "GET"){
        const db=client.db();

        let result;

        try{
            result= await db.collection("bookings").find({ status: "pending"}).toArray();
        }catch(error){
            res.status(500).json({ message: "Inserting document failed" });
            return;
        }

        res.status(200).json({ message: "Here are the bookings", bookings: result})
    }

    if(req.method === "POST"){
        const db=client.db();

        const document={
            name: req.body.name,
            email: req.body.email,
            id: req.body.id,
            time_slot: req.body.time_slot,
            day: req.body.day,
            status: "pending",
            book_id: uuidv4()
        }
        let result;

        try{
            result= await db.collection("bookings").insertOne(document);
        }catch(error){
            res.status(500).json({ message: "Inserting document failed" });
            return;
        }

        let user;
        var count = req.body.count;
        console.log(count)
        try {
            user = await db.collection("users").updateOne({email: req.body.email},{$set:{"slotcount": count+1}});
            console.log(count)
          } catch (err) {
            if (err) {
              res.status(422).json({message: "User doesnt exist!"});
              return;
            }
          }
        

        res.status(200).json({ message: "got hit at time slot api", document: document})
    }
}

export default handler;