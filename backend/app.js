const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //Parse incoming POST data for the server.
const Post = require("./models/post");

const app = express();

const mongooseOpts = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
};

mongoose
  .connect(
    'mongodb+srv://avijit:9c1rJq1uW2WACg15@stage-0.fp8i1.gcp.mongodb.net/mean-demo?retryWrites=true&w=majority',
    mongooseOpts
  )
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => {
    console.log(error);
  });

// app.use((req, res, next) => {
//   console.log("First Middleware!");

//   /* We need to call next() if we have some other request to handle.
//   Otherwise it will stuck in this request and will timeout at some point. */
//   next();
// });

app.use(bodyParser.json()); //Parse incoming data as JSON

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

  next();
});

/* app.use() --> We could use this but, this will not enforce any specific method to handle the request. 
So we should use the methods below for different http request types */

/*NOTE:- I am not using next() function here because I don't want to handle this requests using another handler. */
app.post("/api/create-post", (req, res, next) => {
  // Preparing the data as per the schema that we defined in post.js file.
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save(); // Storing the data to database.
  console.log(post);

  res.status(201).json({
    success: true,
    message: "Post created successfully",
  });
});

app.get("/api/posts", (req, res, next) => {
  // Fetching the data from the database.
  Post.find()
    .then((docs) => {
      res.status(200).json({
        success: true,
        message: "Posts recieved successfully.",
        posts: docs.map((item) => {
          return {
            id: item._id,
            title: item.title,
            content: item.content,
          }
        }),
      });
    })
});

module.exports = app;