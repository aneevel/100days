const mongodb = require("mongodb");

const DB = require("../data/database");

class Todo {
  constructor(text, id) {
    this.text = text;
    this.id = id;
  }

  static async getAllTodos() {
      const todoDocuments = await DB.getDb().collection('todos').find().toArray();

      return todoDocuments.map((todoDocument) => {
        return new Todo(todoDocument.text, todoDocument._id);
      });
  }

  save() {
    if (this.id) {
      const todoID = new mongodb.ObjectId(this.id);
      return DB.getDb()
        .collection("todos")
        .updateOne(
          { _id: todoID },
          {
            $set: { text: this.text },
          }
        );
    } else {
      return DB.getDb().collection("todos").insertOne({ text: this.text });
    }
  }

  delete() {
      if (!this.id) {
          throw new Error('Trying to delete todo without id!');
      }
      const todoID = new mongodb.ObjectId(this.id);
      return DB.getDb().collection('todos').deleteOne({ _id: todoID });
  }
}

module.exports = Todo;
