var express = require("express");
var app = express();
var path = require("path");
app.use(express.json());
app.use(express.urlencoded());
var db = {
  friends: [
    {
      name: "john doe",
      photo: "www.johndoe.com",
      scores: ["3", "3", "3", "3", "3", "3", "3", "3", "3", "3"]
    },
    {
      name: "just just",
      photo: "justjust.com",
      scores: ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1"]
    },
    {
      name: "most most",
      photo: "mostmost.com",
      scores: ["5", "5", "5", "5", "5", "5", "5", "5", "5", "5"]
    }
  ]
};
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/app/public/home.html"));
});
app.get("/survey", (req, res) => {
  res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});
app.get("/api/friends", (req, res) => {
  res.json(db.friends);
});
app.post("/api/friends", (req, res) => {
  var friend = {};
  friend.name = req.body.name;
  friend.photo = req.body.photo;
  friend.scores = req.body.scores;
  var bestfriend = {};
  var bestfriendScore = 100;
  db.friends.forEach(otherFriend => {
    var totalDiff = 0;

    for (var i = 0; i < otherFriend.scores.length; i++) {
      var difference = Math.abs(friend.scores[i] - otherFriend.scores[i]);
      totalDiff += difference;
      console.log(totalDiff);
    }
    if (totalDiff < bestfriendScore) {
      bestfriend = otherFriend;
      bestfriendScore = totalDiff;
      // console.log(bestfriend.name, bestfriendScore);
    }
    console.log(bestfriend.name, bestfriendScore);
  });
  db.friends.push(friend);
  res.json(bestfriend);
});
app.listen(3001, () => console.log("[starting server] localhost:3001"));
