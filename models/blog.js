const mongoose = require("mongoose")

const Schema = mongoose.Schema; //this Schema is a constructor function and we are going to use it to careet  aschema

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true });

// create model based on the schema

const Blog = mongoose.model("Blog",blogSchema)   

module.exports = Blog;


