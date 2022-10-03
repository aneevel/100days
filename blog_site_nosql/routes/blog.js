const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const mongodb = require("mongodb");

const db = require("../data/database");

const ObjectId = mongodb.ObjectId;

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async (req, res) => {
  const posts = await db
    .getDB()
    .collection("posts")
    .find({})
    .project({ title: 1, summary: 1, "author.name": 1 })
    .toArray();

  res.render("posts-list", { posts: posts });
});

router.get("/post/:id", async (req, res) => {
  const id = new ObjectId(req.params.id);
  const post = await db
    .getDB()
    .collection("posts")
    .findOne({ _id: id });

  if (!post) return res.status(404).render("404");

  const postDetails = {
    title: post.title,
    body: post.body,
    date: post.date.toISOString(),
    humanReadableDate: post.date.toLocaleDateString("en-US", {
      weekDay: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    author_name: post.author.name,
    author_email: post.author.email,
  };

  res.render("post-detail", { post: postDetails });
});

router.get("/post/:id/edit", async (req, res) => {
  const id = new ObjectId(req.params.id);
  const post = await db.getDB().collection("posts").findOne({ _id: id });

  if (!post) return res.status(404).render("404");

  res.render("update-post", { post: post });
});

router.post("/post/:id/edit", async (req, res) => {
  
  await db
    .getDB()
    .collection("posts")
    .updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          title: req.body.title,
          summary: req.body.summary,
          content: req.body.content,
        },
      }
    );

    res.redirect("/posts");
});

router.post("/posts", async (req, res) => {
  const authorId = new ObjectId(req.body.author);
  const author = await db
    .getDB()
    .collection("authors")
    .findOne({ _id: authorId });

  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: authorId,
      name: author.name,
      email: author.email,
    },
  };

  const result = await db.getDB().collection("posts").insertOne(newPost);
  console.log(result);

  res.redirect("/posts");
});

router.get("/new-post", async function (req, res) {
  const authors = await db.getDB().collection("authors").find().toArray();

  res.render("create-post", { authors: authors });
});

router.post("/post/:id/delete", async (req, res) => {
  await db.getDB().collection("posts").deleteMany({ _id: new ObjectId(req.params.id) })

  res.redirect('/posts');
});

module.exports = router;
