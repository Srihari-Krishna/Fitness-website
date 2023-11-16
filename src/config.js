const mongoose = require('mongoose');
const connect=mongoose.connect("mongodb://localhost:27017/login");

connect.then(()=>{
    console.log("Database connection successful");
})
.catch(()=>{
    console.log("Database connection failed");
});

const LoginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const muscleSchema = new mongoose.Schema({
    name: String,
    video: String,
    images: [String],
    text: String,
});

const Muscle = new mongoose.model("exercises",muscleSchema);
const collection = new mongoose.model("users",LoginSchema);

module.exports = {
    Muscle,
    collection,
};
