import type { NextPage } from "next";
import { MongoClient, ObjectId } from "mongodb";
import { Context } from "vm";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { Meetup } from "../../Interfaces/Meetup.interface";

const MeetupDetails: NextPage<{ meetupData: Meetup }> = ({ meetupData }) => {
    return <MeetupDetail image={meetupData.image} title={meetupData.title} description={meetupData.description} address={meetupData.address} />;
};

export async function getStaticPaths() {
    const client = await MongoClient.connect(
        "mongodb://nextjs:nextjs@node-api-shard-00-00.lfuuh.mongodb.net:27017,node-api-shard-00-01.lfuuh.mongodb.net:27017,node-api-shard-00-02.lfuuh.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-f6216i-shard-0&authSource=admin&retryWrites=true&w=majority"
    );
    const db = client.db("meetups");
    const collection = db.collection("meetups");
    const meetups = await collection.find({ _id: 1 }).toArray();
    client.close();
    return {
        paths: meetups.map((meetup) => ({
            params: {
                meetupId: meetup._id.toString()
            }
        })),
        fallback: true
    };
}

export async function getStaticProps(context: Context) {
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect(
        "mongodb://nextjs:nextjs@node-api-shard-00-00.lfuuh.mongodb.net:27017,node-api-shard-00-01.lfuuh.mongodb.net:27017,node-api-shard-00-02.lfuuh.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-f6216i-shard-0&authSource=admin&retryWrites=true&w=majority"
    );
    const db = client.db("meetups");
    const collection = db.collection("meetups");
    const meetup = await collection.findOne({ _id: ObjectId(meetupId) });

    client.close();

    return {
        props: {
            meetupData: {
                id: meetup!._id.toString(),
                title: meetup!.title,
                description: meetup!.description,
                address: meetup!.address,
                image: meetup!.image
            }
        }
    };
}

export default MeetupDetails;
