//code our schema
// import mongoose
// mongodb -> mongoose/mongodb driver -> express
// mongoose will change to js obj. 
// in mongodb driver we our self will change to js obj.
// mongo compass => rather than using mongodb directly on cli use mongo compass





const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    //our attributes
    firstName: {
        type: String,
        // allowNull: false,
        // select: false,
    },
    lastName:{
        type: String,
        // default: "Abebe"
    },
    email:{
        type: String,
    },
    password:{
        type: String,
        select: false,
    }
},
{
    timestamps: true
}
)

// hash a password
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.verifyPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model("User", userSchema);
module.exports = User;

