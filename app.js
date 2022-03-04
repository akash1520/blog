const express = require('express')
const http = require("http")
const _ = require('lodash')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const req = require('express/lib/request')
const {
    response
} = require('express')

const app = express()
app.set('view engine', 'ejs')
app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}))

let psts = [{
    topic: "Akash",
    blog: "Looking forward to creating a full fledged blog website, where you will be able to post blogs as a user and there will be some system to rate the blogs."
}]


app.get(["/", "/home"], (req, res) => {

    res.render('home', {
        blog: psts
    })
})


app.post("/compose", (req, res) => {

    let pst = {
        topic: req.body.title,
        blog: req.body.blog
    }
    psts.push(pst);
    res.redirect("/")
})

app.get("/:page", (req, res) => {
    res.render(req.params.page);
})



app.get("/posts/:post", (req, res) => {
    for (let i = 0; i < psts.length; i++) {
        if (_.lowerCase(req.params.post) === _.lowerCase(psts[i].topic)) {
            res.render('posts', {
                e: psts[i]
            })
            break
        }
    }

})



app.listen(3000, () => {
    console.log("Server started on port 3000.")
})