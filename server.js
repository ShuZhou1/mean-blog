/**
 * Created by TREE on 6/29/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/meanblogs');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/api/post", findAllPosts);
app.delete("/api/post/:id", removePost);
app.post("/api/post", createPost);

var posts = [];

var PostSchema = mongoose.Schema({
    title : String,
    body : String
});

var PostModel = mongoose.model("PostModel", PostSchema);

function createPost(req, res) {
    var post = req.body;
    PostModel
        .create(post)
        .then(function (doc) {
            posts.push(doc)
            res.json(posts);
        });
}

function removePost(req, res) {
    var id = req.params.id;
    // posts.splice(index, 1);
    PostModel
        .remove({_id: id})
        .then(function (stat) {
            findAllPosts(req, res);
        });
}

function findAllPosts(req, res) {
    // console.log(req);
    PostModel
        .find()
        .then(function (docs) {
            posts = docs;
            res.json(posts);
        });
}


app.listen(3000);
