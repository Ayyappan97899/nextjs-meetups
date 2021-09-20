import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
import MeetupDetails from "../../components/meetups/MeetupDetails";

const DetailPage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.singlemeetup.title}</title>
        <meta name="description" content={props.singlemeetup.description} />
      </Head>
      <MeetupDetails
        title={props.singlemeetup.title}
        image={props.singlemeetup.image}
        address={props.singlemeetup.address}
        description={props.singlemeetup.description}
      />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://nextjs:K0OcDeByhHYRW2N2@cluster0.3oihr.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetupdata = await meetupCollection.find({}, { _id: 1 }).toArray();
  console.log(meetupdata);
  client.close();
  return {
    fallback: false,
    paths: meetupdata.map((meetup) => {
      return {
        params: {
          meetupid: meetup._id.toString(),
        },
      };
    }),
  };
};

export const getStaticProps = async (context) => {
  const meetupid = context.params.meetupid;
  console.log(meetupid);

  const client = await MongoClient.connect(
    "mongodb+srv://nextjs:K0OcDeByhHYRW2N2@cluster0.3oihr.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetupdata = await meetupCollection.findOne({
    _id: ObjectId(meetupid),
  });
  client.close();
  return {
    props: {
      singlemeetup: {
        id: meetupdata._id.toString(),
        title: meetupdata.title,
        image: meetupdata.image,
        address: meetupdata.address,
        description: meetupdata.description,
      },
    },
  };
};

export default DetailPage;
