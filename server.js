const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
//make it so the welcome message is also created by using addMessage, instead of being hardcorded into the messages array. that means the messages array should start as an empty array, and have the messages pushed to it later. TEST: looks the same as before but all IDs are 1
let messages = [];
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
app.get("/messages/search",function(req,res){

  const filteredMessages=messages.filter(element=>{
  
    return element.text.toLowerCase().includes(req.query.text.toLowerCase())
  })
  console.log(filteredMessages)
  if(filteredMessages.length==0){
    res.send("Try Something New ")
  }
 else{ res.send(filteredMessages)
 }
})
app.get("/messages/:id",function(req,res){
  res.send(messages.find(element=>element.id==req.params.id))
  console.log(req.params)
})
app.delete("/messages/:id", function(req,res){
  messages=messages.filter(element=>element.id!=req.params.id)
     res.send() 
})
app.post("/messages",function(req,res){
  if(req.body.from=="" || req.body.text==""){
    res.status(400).send("sorry! cant find")
  }
  else{
addMessage(req.body.from,req.body.text)
 res.redirect("/messages")
  }
})



app.listen(3000, () => {
   console.log("Listening on port 3000")
  });
