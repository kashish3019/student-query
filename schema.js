const mongoose = require("mongoose")
let studentschema = new mongoose.Schema({
    name: String,
    gender: String,
    class: String,
    section: String,
    maths: Number,
    science: Number,
    english: Number
})
let studentdata = mongoose.model("student", studentschema)
module.exports = studentdata