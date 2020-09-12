const express = require('express');
const bodyParser = require('body-parser'); //Parse incoming POST data for the server. 
const app = express();

// app.use((req, res, next) => {
//   console.log("First Middleware!");

//   /* We need to call next() if we have some other request to handle. 
//   Otherwise it will stuck in this request and will timeout at some point. */
//   next();
// });

app.use(bodyParser.json()); //Parse incoming data as JSON

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods', 
    'GET, POST, PATCH, DELETE, OPTIONS'
  );

  next();
});

/* app.use() --> We could use this but, this will not enforce any specific method to handle the request. 
So we should use the methods below for different http request types */

app.post('/api/create-post', (req, res, next) => {
  const post = req.body;
  console.log(post);

  res.status(201).json({
    success: true,
    message: 'Post created successfully',
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'p123jhkj',
      title: 'Post from Node-backend',
      content: 'Firsr server-side post data.'
    },
    {
      id: 'p45kjh6g',
      title: 'Post from Node-backend',
      content: 'Second server-side post data.'
    },  
  ];

  res.status(200).json({
    success: true,
    message: 'Posts recieved successfully.',
    posts: posts,
  });
});

module.exports = app;