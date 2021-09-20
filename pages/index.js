import { Fragment } from "react";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

const Allmeetup = (props) => {
  console.log(props.meetups);
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://nextjs:K0OcDeByhHYRW2N2@cluster0.3oihr.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetupdata = await meetupCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetupdata.map((meetup) => {
        return {
          key: meetup._id.toString(),
          id: meetup._id.toString(),
          title: meetup.title,
          image: meetup.image,
          address: meetup.address,
        };
      }),
      revalidate: 1,
    },
  };
};

export default Allmeetup;
