const mongodb = require("mongodb");

const db = require("../data/database");

const ObjectId = mongodb.ObjectId;

class Post {
  constructor(title, content, id) {
    this.title = title;
    this.content = content;

    if (id) {
      this.id = new ObjectId(id);
    }
  }

  static async fetchAll() {
    const posts = await db.getDB().collection("posts").find().toArray();
    return posts;
  }

  async fetch() {
    if (!this.id) return;

    const post = await db.getDB().collection("posts").findOne({ _id: this.id });
    this.title = post.title
    this.content = post.content
    return post;
  }

  async save() {
    let result;
    if (this.id) {
      result = await db
        .getDB()
        .collection("posts")
        .updateOne(
          { _id: this.id },
          { $set: { title: this.title, content: this.content } }
        );
    } else {
      result = await db.getDB().collection("posts").insertOne({
        title: this.title,
        content: this.content,
      });

      return result;
    }
  }

  async delete() {
    if (!this.id) return;

    return await db.getDB().collection("posts").deleteOne({ _id: this.id });
  }
}

module.exports = Post;
