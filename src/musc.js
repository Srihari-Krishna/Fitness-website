const mongoose = require('mongoose');
const connect=mongoose.connect("mongodb://localhost:27017/muscle");

connect.then(()=>{
    console.log("Database muscle connection successful");
})
.catch((err)=>{
    console.log("Database muscle connection failed");
    console.log(err);
});

const muscleSchema = new mongoose.Schema({
    name: String,
    video: String,
    images: [String],
    text: String,
});

const Muscle = new mongoose.model("exercises",muscleSchema);
module.exports = Muscle;
