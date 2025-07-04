const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
const { ObjectId } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ub1fi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// middleware
app.use(express.json());
app.use(cors());

async function run() {
  try {
    // Collections
    const UsersCollection = client.db("NexusEvents").collection("users");
    const EventsCollection = client.db("NexusEvents").collection("events");

    // Register User
    app.post("/register", async (req, res) => {
      const newUser = req.body;
      const result = await UsersCollection.insertOne(newUser);
      res.send(result);
    });

    // login User
    app.post("/login", async (req, res) => {
      const { email, password } = req.body;
      const user = await UsersCollection.findOne({ email, password });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password." });
      }
      res.json({
        message: "Login successful!",
        user,
      });
    });

    // Add Event
    app.post("/addEvent", async (req, res) => {
      const newEvent = req.body;
      const result = await EventsCollection.insertOne(newEvent);
      res.send(result);
    });

    // My Events Route
    app.post("/myEvents", async (req, res) => {
      const { email } = req.body;
      const result = await EventsCollection.find({ email }).toArray();
      res.send(result);
    });

    // Update Event Route
    app.put("/updateEvent/:id", async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      delete updatedData._id;
      const result = await EventsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );
      res.json({ message: "Event updated successfully." });
    });

    // event delete route
    app.post("/deleteEvent", async (req, res) => {
      const { id } = req.body;
      const result = await EventsCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.json({ message: "Event deleted successfully." });
    });

    // get all the route
    app.get("/events", async (req, res) => {
      const result = await EventsCollection.find({})
        .sort({ date: -1, time: -1 })
        .toArray();
      res.send(result);
    });

    app.post("/joinEvent", async (req, res) => {
      const { eventId, email } = req.body;

      const event = await EventsCollection.findOne({
        _id: new ObjectId(eventId),
      });

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      if (event.joinedUsers && event.joinedUsers.includes(email)) {
        return res
          .status(400)
          .json({ message: "You have already joined this event." });
      }

      const updated = await EventsCollection.updateOne(
        { _id: new ObjectId(eventId) },
        {
          $inc: { attendeeCount: 1 },
          $addToSet: { joinedUsers: email },
        }
      );

      res.json({ message: "You have joined the event." });
    });

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("NexusEvents server is running");
});

app.listen(port, () => {
  console.log(`NexusEvents server is running on port: ${port}`);
});
