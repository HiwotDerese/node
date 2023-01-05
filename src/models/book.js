const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    authors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],

    content:{
        type: String
    }
})

module.exports = mongoose.model('Book', bookSchema)


