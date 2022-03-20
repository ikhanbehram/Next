import type { NextPage } from "next";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/MeetupForm";
import { Meetup } from "../../Interfaces/Meetup.interface";

const NewMeetup: NextPage = () => {
    const router = useRouter();
    const addMeetupHandler = async (enteredMeetupData: Meetup) => {
        const response = await fetch("/api/new-meetup", {
            method: "POST",
            body: JSON.stringify(enteredMeetupData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        console.log(data);
        router.push("/");
    };

    return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetup;
