import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://nextjs:K0OcDeByhHYRW2N2@cluster0.3oihr.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(200).json({ message: "Meetup inserted!" });
  }
};

export default handler;
