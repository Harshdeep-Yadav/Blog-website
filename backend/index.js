const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer"); //for uploading images or files on our website
const path = require("path");
const cors =require("cors");

dotenv.config();
app.use(express.json()); // sending json files

// this part is for connecting with mongooDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // usecreateIndex: true,
  })
  .then(console.log("Connect to mongoDB ;-)"))
  .catch((err) => console.log(err));

// for uploading files and images on our website (using multer for that)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, "im.png");
  },
});

// for uplaoding using multer

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

//for routing
app.use(cors())
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

// creating local
app.listen("5000", () => {
  console.log("Server is running!!!  ");
});
