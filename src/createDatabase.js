const mongoose = require("mongoose");
const subscriber = require("./models/subscribers");
const data = require("./data");

// Create Database
const DATABASE_URL =
  "mongodb+srv://abhishek:abhishek@backend-project.l8vxa1d.mongodb.net/subscribersData?retryWrites=true&w=majority";
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Database created in Atlas DB!"));

const refreshAll = async () => {
  await subscriber.deleteMany({});
  await subscriber.insertMany(data);
  await mongoose.disconnect();
};
refreshAll();
