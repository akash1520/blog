const express = require('express')
const http = require("http")
const _ = require('lodash')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://admin-akash:Test123@cluster0.o03fl.mongodb.net/blogDB");


const app = express()
app.set('view engine', 'ejs')
app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}))

const postSchema = new mongoose.Schema({
    topic:String,
    blog:String
})

const Post = mongoose.model("post",postSchema);

const psts =new Post({
    topic: "Akash",
    blog: "Looking forward to creating a full fledged blog website, where you will be able to post blogs as a user and there will be some system to rate the blogs."
})
psts.save()


app.get(["/", "/home"], (req, res) => {

    Post.find({},(err,foundBlogs)=>{
        res.render('home', {
            blog: foundBlogs
        })
    })

    
    
})


app.post("/compose", (req, res) => {

    const anything = new Post({
        topic: req.body.title,
        blog: req.body.blog
    })
    anything.save(function(err){

        if (!err){
     
          res.redirect("/");
     
        }
     
      });
})

app.get("/:page", (req, res) => {
    res.render(req.params.page);
})



app.get("/posts/:post", (req, res) => {

    Post.find({},(err,foundBlogs)=>{
        for (let i = 0; i < foundBlogs.length; i++) {
            if (_.lowerCase(req.params.post) === _.lowerCase(foundBlogs[i].topic)) {
                res.render('posts', {
                    e: foundBlogs[i]
                })
                break;
            }
        }
    })
    

})



app.listen(3000, () => {
    console.log("Server started on port 3000.")
})