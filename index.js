const app = require("./src/app");
const mongoose = require("mongoose");
const port = 3000;

// Connect to Database
const DATABASE_URL =
  "mongodb+srv://abhishek:abhishek@backend-project.l8vxa1d.mongodb.net/subscribersData?retryWrites=true&w=majority";
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected to Atlas DB!"));

// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`));
