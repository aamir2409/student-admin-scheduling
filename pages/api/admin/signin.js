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
        const email = req.body.email;
        const password = req.body.password;
        
        if(
            !email || !email.includes("@")
        ){
            res.status(422).json({ message: "invalid input"});
            return;
        }

        let user;
        const db = await client.db();
        try {
          user = await db.collection("users").findOne({email:email});
          
        } catch (err) {
          if (err) {
            res.status(422).json({message: "User doesnt exist!"});
            return;
          }
        }
        
        if (!user) {
            res.status(422).json({message: "User doesnt exist!"});
            return;
        }

        if(user.password === password){
             res.status(200).json({ message: "signedin",user: user});
            return;
        }
        
        res.status(201).json({ message: "Signed In",user:user})
    }
}


export default handler;