const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const { Muscle,collection } = require("./config")

const app = express();
const port = 5000

app.use(express.json());

app.use(express.urlencoded({ extended:false }));

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get('/', (req, res) =>{
    res.render('home'); // res.render(<h1>Home</h1>)
})

app.get('/contact_us', (req, res) =>{
    res.render('contact_us');
})

app.get('/login', (req, res) =>{
    res.render('login');
});

app.get('/workout', async (req, res)=>{
    try{
        const muscles = await Muscle.find();
        res.render('workout',{muscles});
    }catch(e){
        console.log(e);
        res.status(500).send('Internal server error');
    }
})

app.post('/signup',async (req, res)=>{
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    const existingUser = await collection.findOne({name:data.name});
    if(existingUser){
        
        res.send('<script>alert("User already exists")</script>');
    }
    else{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password,saltRounds);

        data.password = hashedPassword;

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
    res.redirect('/login');
})

app.post('/login',async (req, res)=>{
    try{
        const check = await collection.findOne({name:req.body.username});
        if(!check){
            res.send('<script>alert("User not found")</script>');
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password,check.password);
        if(!isPasswordMatch){
            res.send('<script>alert("Password is incorrect")</script>');
        }
        else{
            res.render('dashboard');
        }
    }catch{
        res.send('<script>alert("Something went wrong")</script>');
    }
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});