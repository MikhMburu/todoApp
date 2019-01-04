const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI || "mongodb://localhost:27017/ToDoApp", { useNewUrlParser: true }).then(()=>{
    console.log("Connection successful. . . ");
},e=>{
    console.log("Could not connect to database. . .\n",e);
});

module.exports = {mongoose};