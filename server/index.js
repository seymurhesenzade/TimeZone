// const { watch } = require("chokidar");
const express = require("express");
const mongoose = require("mongoose");
const { message } = require("statuses");
//? Schema ni import elemeyin birinci yolu budur:
const Schema = mongoose.Schema;
//! Schema ni import elemeyin ikinci yolu budur:
// const {Schema}=mongoose;
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

const port = 8080;

const DB_URL =
  "mongodb+srv://mi7ky0vux:azmp101@cluster0.aw9nvuj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const WatchSchema = new Schema({
  title: { type: String, require: true },
  price: { type: String, require: true },
  imageUrl: { type: String, require: true },
},{timestamps: true});

const WatchModel = mongoose.model("Watch", WatchSchema);

app.get("/watches", async (req, res) => {
  try {
    const watches = await WatchModel.find({});
    if (watches.length > 0) {
      res.status(200).send({ message: "success", data: watches });
    } else {
      res.status(204).send({ message: "data is empty" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
app.get("/watches/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const watch = await WatchModel.findById(id);
    if (watch) {
      res.status(200).send({ message: "success", data: watch });
    } else {
      res.status(404).send({ message: "Data Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
app.delete("/watches/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedWatch = await WatchModel.findByIdAndDelete(id);
    res.status(200).send({ message: "Deleted succefully", deletedWatch: deletedWatch });
    
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});
app.post("/watches", async (req, res) => {
  try {
    const newWatch = new WatchModel({ ...req.body });
    await newWatch.save();
    res.status(201).send({ message: "Created successfully", data: newWatch});
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

mongoose.connect(DB_URL).then(() => {
  console.log("Connected!");
  app.listen(port, () => {
    console.log(`Link: http://localhost:${port}`);
  });
});
