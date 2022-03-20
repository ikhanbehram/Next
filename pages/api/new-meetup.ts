import { MongoClient } from "mongodb";
import { Meetup } from "../../Interfaces/Meetup.interface";

interface Request {
    method: string;
    body: Meetup;
}

async function handler(req: Request, res: any) {
    if (req.method === "POST") {
        const { body } = req;
        const { title, image, address, description } = body;
        const client = await MongoClient.connect("mongodb+srv://nextjs:nextjs@node-api.lfuuh.mongodb.net/meetups?retryWrites=true&w=majority");
        const db = client.db("meetups");
        const collection = db.collection("meetups");
        const result = await collection.insertOne({ title, image, address, description });
        console.log(result);
        client.close();
        res.status(201).json({
            message: "Meetup created successfully"
        });
    }
}

export default handler;
