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
];

let topNine = [
  {
    id: 1,
    user_id: 1,
    title: "Somthing",
    description: "Something Else",
    image_url:
      "https://s3.amazonaws.com/tinycards/image/4b42ac408eb61db4867f6558f1713fb7"
  },
];

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
    console.log(newArray);
  res.status(200).json(newArray);
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
