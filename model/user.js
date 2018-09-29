const mongoose = require("mongoose");
var user = new mongoose.Schema(
    {
        avatar: String,
        username: String,
        password: String,
        email: {
            type: String,
            unique: true,
            required:true
        },
        desc: String,
        
    },
    {
        versionKey: false,
        timestamps: { createdAt: "createdTime", updatedAt: "updateTime" }
    }
);
module.exports = mongoose.model('user',user)
