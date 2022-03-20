import type { NextPage } from "next";
import { Context } from "vm";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails: NextPage = () => {
    return (
        <MeetupDetail
            image={"https://wallpaperaccess.com/full/760289.jpg"}
            title={"First Mettup"}
            description={"some meetup"}
            address={"baker street london"}
        />
    );
};

export async function getStaticPaths() {
    return {
        paths: [{ params: { meetupId: "m1" } }, { params: { meetupId: "m2" } }],
        fallback: false
    };
}

export async function getStaticProps(context: Context) {
    const meetupId = context.params.meetupId;
    console.log(meetupId);

    return {
        props: {
            meetupData: {
                id: meetupId,
                title: "A first Meetup",
                image: "https://wallpaperaccess.com/full/760289.jpg",
                address: "some address",
                description: "123123123 hi"
            }
        }
    };
}

export default MeetupDetails;
