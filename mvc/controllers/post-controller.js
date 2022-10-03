const Post = require("../models/post");
const validationSession = require("../utility/validation/validation-session");
const validation = require("../utility/validation/validation");

const getHome = (req, res) => {
  res.render("welcome");
};

const getAdmin = async (req, res) => {

  const posts = await Post.fetchAll();

  let sessionErrorData = validationSession.getSessionErrorData(req, {
      title: '',
      content: ''
  });

  res.render("admin", {
    inputData: sessionErrorData,
    posts: posts,
  });
};

const createPost = async (req, res) => {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (!validation.postIsValid(enteredTitle, enteredContent)) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Invalid input - please check your data.",
        title: enteredTitle,
        content: enteredContent,
      },
      () => {
        res.redirect("/admin");
      }
    );

    return; // or return res.redirect('/admin'); => Has the same effect
  }

  const newPost = new Post(enteredTitle, enteredContent);
  await newPost.save();

  res.redirect("/admin");
};

const getPost = async (req, res, next) => {
  let post;
  try {
    post = new Post(null, null, req.params.id);
  } catch (error) {
    return next(error);
  }
  await post.fetch();

  if (!post.title || !post.content) {
    return res.render("404"); // 404.ejs is missing at this point - it will be added later!
  }

  let sessionErrorData = validationSession.getSessionErrorData(req, {
      title: post.title,
      content: post.content
  });

  res.render("single-post", {
    post: post,
    inputData: sessionErrorData,
  });
};

const updatePost = async (req, res) => {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (!validation.postIsValid(enteredTitle, enteredContent)) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Invalid input - please check your data.",
        title: enteredTitle,
        content: enteredContent,
      },
      () => {
        res.redirect(`/posts/${req.params.id}/edit`);
      }
    );

    return;
  }

  const newPost = new Post(enteredTitle, enteredContent, req.params.id);
  await newPost.save();

  res.redirect("/admin");
};

const deletePost = async (req, res) => {
  const post = new Post(null, null, req.params.id);
  await post.delete();

  res.redirect("/admin");
};

module.exports = {
  getHome: getHome,
  getAdmin: getAdmin,
  createPost: createPost,
  getPost: getPost,
  updatePost: updatePost,
  deletePost: deletePost,
};
