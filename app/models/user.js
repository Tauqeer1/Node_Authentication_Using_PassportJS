/**
 * Created by Tauqeer Ahmed on 3/4/2016.
 */

/* user.js contain our user model schema database */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//define the schema for our user model
var userSchema = mongoose.Schema({
    local: {
        email: String,
        password: String
    },
    facebook : {
        id : String,
        token : String,
        email : String,
        name : String
    },
    twitter : {
        id : String,
        token : String,
        displayName : String,
        username : String
    },
    google : {
        id : String,
        token : String,
        email : String,
        name : String
    }
});

//custom method for generating the hash
userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};


//custom method to check if password is valid
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password,this.local.password);
};


module.exports = mongoose.model('User',userSchema);