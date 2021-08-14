import { connectToDatabase } from "../../../helpers/db";



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
        let students;
        
        try {
            students = await db.collection("users").find({ role: "student" }).toArray();
            
          } catch (err) {
            if (err) {
              res.status(422).json({message: "Student doesnt exist!"});
              return;
            }
          }
         
          console.log(students)

        res.status(201).json({ message: "got students", data: students})
    }

    if(req.method ==="POST"){

        const email = req.body.email;
        const password = req.body.password;
        
        if(
            !email || !email.includes("@")
        ){
            res.status(422).json({ message: "invalid input"});
            return;
        }
        
        
        const db=client.db();
        let student;

        try{
            student = await db.collection("users").findOne({email:email});
        }catch (err) {
            if (err) {
              res.status(422).json({message: "Student doesnt exist!"});
              return;
            }
        }

        if (!student) {
            res.status(422).json({message: "Student doesnt exist!"});
            return;
        }

        if(student.password === password){
            res.status(200).json({ message: "signedin",student: student});
           return;
       }
       res.status(201).json({ message: "Signed In",student: student})
    }
}

export default handler;