const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;
const app = express();
const token =
  "jhbaskjdfhbsLKFEJBiweuhw8497hwo4ufhwp94fhp9w48fh498hwp948hyp948hp948";

let users = [
  {
    id: 1,
    name: "Christopher",
    email: "cmr629@gmail.com",
    password: "12345"
  },
  {
    id: 2,
    name: "Someone",
    email: "test",
    password: "test"
  },
];

let topNine = [
  {
    id: 1,
    user_id: 1,
    title: "Somthing",
    description: "Something Something Something Something Something Something Something Something Something",
    image_url:
      "https://s3.amazonaws.com/tinycards/image/4b42ac408eb61db4867f6558f1713fb7"
  },
  {
    id: 2,
    user_id: 1,
    title: "Somthing Else",
    description: "Something Else Something Else Something Else Something Else Something Else Something Else Something Else Something Else Something Else Something Else Something Else Something Else Something Else Something Else",
    image_url:
      "https://s3.amazonaws.com/tinycards/image/4b42ac408eb61db4867f6558f1713fb7"
  },
  {
    id: 3,
    user_id: 2,
    title: "Somthing",
    description: "Something Something Something Something Something Something Something Something Something",
    image_url:
      "https://s3.amazonaws.com/tinycards/image/4b42ac408eb61db4867f6558f1713fb7"
  },
  {
    id: 4,
    user_id: 2,
    title: "Somthing Else",
    description: "Something Else Something Else Something Else Something Else Something Else Something Else Something Else Something Else Something Else Something Else Something Else Something Else Something Else Something Else",
    image_url:
      "https://s3.amazonaws.com/tinycards/image/4b42ac408eb61db4867f6558f1713fb7"
  },
];

let topNineID = topNine.length + 1;

app.use(bodyParser.json());

app.use(cors());

function authenticator(req, res, next) {
  const { authorization } = req.headers;
  if (authorization === token) {
    next();
  } else {
    res.status(403).json({ error: "Need to be logged in to do that." });
  }
}

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const login = users.find(user => user.email === email);

  if (email === login.email && password === login.password) {
    res.status(200).json({
      payload: { userID: login.id, auth: token }
    });
  } else {
    res
      .status(403)
      .json({ error: "Username or Password incorrect. Please see Readme" });
  }
});

app.get("/api/topnine/:userID", authenticator, (req, res) => {
  const newArray = topNine.filter(item =>  item.user_id == req.params.userID );
  if (newArray)
    res.status(200).json(newArray);
  else 
    res.status(404).send({ msg: 'Not found' });
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

app.post('/topnine', (req, res) => {
  const { title, description, image_url } = req.body;
  const item = { id: topNineID, user_id: 1,  title, description, image_url };
  if (!title || !description || !image_url) {
    return sendUserError(
      'Error',
      res
    );
  }
  const findItem = item => {
    return item.title === title;
  };
  if (topNine.find(findItem)) {
    return sendUserError(
      `Already exists in DB.`,
      res
    );
  }

  topNine.push(item);
  topNineID++;
  res.json(topNine);
});

app.put('/topnine/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, imageURL } = req.body;
  const findByID = item => {
    return item.id == id;
  };
  const item = topNine.find(findByID);
  if (!item) {
    return sendUserError('No item by that ID', res);
  } else {
    if (title) item.title = title;
    if (description) item.description = description;
    if (image_url) item.image_url = image_url;
    res.json(topNine);
  }
});