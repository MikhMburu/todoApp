const bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");
const {mongoose} = require("../db/mongoose-connect.js");
const {todoSchema} = require("../schema/todo");
const {userSchema} = require("../schema/users");

const express = require("express");
const port = process.env.PORT || 3000;

var ToDo = mongoose.model("ToDo",todoSchema);
var User = mongoose.model("users", userSchema);

const app = express();

app.use(bodyParser.json());


// var newToDo = new ToDo({
//     text: "Feed the dogs",     
// });
// var newUser = new User({
//     email: "mymail@gmail.com"
// });
app.post("/todos", (req, res)=>{
    // console.log(req.body);
    var newTodo = new ToDo({
        text: req.body.text
    });
    newTodo.save().then(doc=>{
        res.status(200).send(doc);
    },err=>{
        res.status(400).send("Unable to save the document", err);
    });
});

app.get("/todos", (req, res)=>{
    ToDo.find().then(docs=>{
        res.status(200).send({docs});
    },err=>{
        res.status(400).send("Unable to retrieve todos..\n",err)
    });
});

app.get("/todos/:id", (req, res)=>{
    var id = req.params.id;
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    ToDo.findById(id)
    .then(todo=>{
        if(!todo){
            return res.status(404).send(); 
        }
        res.send({todo});
    }).catch(err=>{
        res.status(400).send();
    });

})

app.listen(port, ()=>{
    console.log(`App running on port ${port}. . . .`)
});


module.exports = {app, ToDo, User};