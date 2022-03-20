import type { NextPage } from "next";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Meetup } from "../Interfaces/Meetup.interface";

const Home: NextPage<{ meetups: Meetup[] }> = ({ meetups }) => {
    return <MeetupList meetups={meetups} />;
};

export async function getStaticProps() {
    const client = await MongoClient.connect("mongodb+srv://nextjs:nextjs@node-api.lfuuh.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db("meetups");
    const collection = db.collection("meetups");
    const meetups = await collection.find({}).toArray();
    client.close();
    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                description: meetup.description,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        }
    };
}

export default Home;
