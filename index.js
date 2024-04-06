const express=require('express');
const mysql=require('mysql');
const bodyParser=require('body-parser');
const path=require("path");
const app=express();
const port= 3000;  //3306
const bcrypt=require('bcrypt');
const saltRounds=10;
//connecting to the mysql server  
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'adityaiiit',
    database:'login',});
db.connect((err)=> {
    if (err){
        console.error('Error connecting to Mysql:'+err.stack);
        return;}
    console.log('Connected to Mysql as ID:'+db.threadId); //increases after every reconnection
});
//middleware
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static('public'));
// the registration page
app.get('/register',(req, res) => {
res.sendFile(__dirname +'/public/register.html');});
app.post("/register",(req,res)=>{
    const { username,password }=req.body;
    bcrypt.hash(password,saltRounds,(err, hash) => {
        if(err) {
            console.error('Error hashing password:',err);
            res.status(500).json({ message: 'Internal server error' });
            return;}
    //storing username and password in database
        db.query('INSERT INTO users (username, password) VALUES (?, ?)',[username,hash],(err,result)=>{
            if (err) {
                console.error('Error storing user:', err);
                res.status(500).json({ message:'Internal server error'});
                return;}
            res.status(200).json({ message: 'User registered successfully'});
        });
    });});

// Login Route (GET)
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
 });
 //image route
 app.get('/login/welcome',(req,res)=>{
    res.render("main.ejs");
 });
// Login Route
app.post('/login',(req,res)=> {
    const {username, password}=req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username],(err, results)=>{
        if (err){
            console.error('Error executing MySQL query: ' + err.stack);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        if (results.length > 0) {
            const hashedPassword=results[0].password;
            bcrypt.compare(password,hashedPassword,(err, result) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    res.status(500).json({message: 'Internal server error' });
                    return;  }
                if (result) {
                    res.status(200).json({message:'Login successful' });
                } else {
                    res.status(401).json({message:'*Invalid username or password'}); }
            });
        } else {
            res.status(401).json({message:'*Invalid username or password'});}
    });
});
// Start the server
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});
