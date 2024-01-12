//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ejs = require("ejs");

mongoose.connect("mongodb+srv://tajulislam1:tajul2114@cluster2footballblog.dugka6h.mongodb.net/footballdocsDB");

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

const homeStartingContent = "This is a blog page with many Documentaries and News of Football Clubs and National Teams.";
const aboutContent = "My name is Tajul Islam Sumon. In this blog I will write varios news on Football Clubs and National Teams.";
const contactContent = "Here are my contact details.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  Post.find({})
    .then(function(posts){
        res.render("home", {
          homepageContent: homeStartingContent, 
          posts: posts
        });
    })
    .catch(function(err){
        console.log(err);
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutpageContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactpageContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save()
  .then(function(){
    if(!err){
      res.redirect("/");
    }
    })
    .catch(function(err){
      console.log(err);
    });

  res.redirect("/");
});

app.get("/posts/:postID", function(req, res){
  const requestedPostID = req.params.postID;
    
      Post.findOne({_id: requestedPostID})
      .then(function(post){
          res.render("post", {
            title: post.title,
            content: post.content
          });
      })
      .catch(function(err){
          console.log(err);
      });
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server started on port 3000");
});
