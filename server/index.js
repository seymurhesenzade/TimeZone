const express = require("express");
const mongoose = require("mongoose");
const { message } = require("statuses");
//? Schema ni import elemeyin birinci yolu budur:
const Schema = mongoose.Schema;
//! Schema ni import elemeyin ikinci yolu budur:
// const {Schema}=mongoose;

// const ObjectId = Schema.ObjectId;

const app = express();
const port = 8080;

const DB_URL =
  "mongodb+srv://mi7ky0vux:azmp101@cluster0.aw9nvuj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const WatchSchema = new Schema({
  title: { type: String, require: true },
  price: { type: String, require: true },
  imageUrl: { type: String, require: true },
});

const WatchModel = mongoose.model("Watch", WatchSchema);

app.get("/watches", async (req, res) => {
  try {
    const watches = await WatchModel.find({});
    if (watches.length > 0) {
        res.status(200).send({message:"success"})
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
app.get("/watches/:id", async (req, res) => {});
app.delete("/watches/:id", async (req, res) => {});
app.post("/watches", async (req, res) => {});

mongoose.connect(DB_URL).then(() => {
  console.log("Connected!");
  app.listen(port, () => {
    console.log(`Link: http://localhost:${port}`);
  });
});
