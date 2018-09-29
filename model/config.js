const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my-note",{ useNewUrlParser: true});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    // we're connected!
    console.log("连接成功");
});
module.exports = db;
