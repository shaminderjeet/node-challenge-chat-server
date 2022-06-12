const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
//make it so the welcome message is also created by using addMessage, instead of being hardcorded into the messages array. that means the messages array should start as an empty array, and have the messages pushed to it later. TEST: looks the same as before but all IDs are 1
const messages = [];
let idCounter=0;
function addMessage(from,text){
  messages.push({from:from,text:text,id:idCounter++})
}
addMessage("Bart","Welcome to the CYF chat system")
addMessage("johny","I Love Barcelona")
addMessage("leena","Good Morning!Barcelona")
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
app.get("/messages",function(req,res){
  res.send(JSON.stringify(messages))
})
app.post("/meassages",function(req,res){
  res.send(addMessage())
})

app.listen(3000, () => {
   console.log("Listening on port 3000")
  });
