// All the Libraries putted here
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
// Mono specific stuff
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://ankit:ankit123@cluster0.nzgafbk.mongodb.net/?retryWrites=true&w=majority', {useUnifiedTopology: true});
}
// define mongoose schema
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    Address: String,
    Query: String
});
const Contact = mongoose.model('Contact', ContactSchema);

// defining App vairable
const app = express();
const port = 3000 ;//defining port

// Express specific stuff
app.use(express.static("static"));
app.use("/static", express.static("static"));//for serving stqatic files
app.use(express.urlencoded());

// Pug specific stuff
app.set("view engine", "pug"); //set teplate engine to pug
app.set("views", path.join(__dirname,"views"));//set the views directory

// END points
app.get("/", (_,res)=>{
    const params={};
    res.status(200).render('../views/home.pug',params);
});
app.get("/contact", (req,res)=>{
    const params={};
    res.status(200).render('../views/contact.pug',params);
});
app.post("/contact", (req,res)=>{
    var mydata=new Contact(req.body);
    mydata.save().then(()=>{
        res.send("This Query is submitted");
    }).catch(()=>{
        res.status(400).send("Query is not submitted");
    })
    
    res.status(200).render('../views/contact.pug');
});

// Start the Server
app.listen(port, ()=>{
    console.log(`the application is started at port ${port}`);
});