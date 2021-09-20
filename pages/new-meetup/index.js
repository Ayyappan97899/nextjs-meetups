import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const Newmeetup = () => {
  const router = useRouter();
  const AddmeetupHandler = async (meetupdata) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupdata),
      headers: {
        "content-type": "application/json",
      },
    });

    const resData = await response.json();
    console.log(resData);
    router.replace("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetup and create amazing network opportunities."
        />
      </Head>
      <NewMeetupForm onAddMeetup={AddmeetupHandler} />;
    </Fragment>
  );
};

export default Newmeetup;
