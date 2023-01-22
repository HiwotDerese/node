const { request } = require("express")
const e = require("express")
const jwt = require('jsonwebtoken')
const User = require("../models/user")
// const {validationResult} = require("express-validator")
const { validate } = require("../middleware/validation/user")

// const Joi = require("joi")
// controller for each router

const getToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };

// create function to register/create a user
const signup = async(req, res) => {
    // accept from postman body we can say {req.body}
    const {firstName, lastName, email, password} = req.body
    try {
        const { error, value} = validate("SIGNUP",req.body);
        if (error) {
            console.log(error);
            return res.send(error.details);  
        }
        const user = await User.create({firstName, lastName, email, password})
        res.status(201).json({
            user
        })
 
    } catch (e) {
        res.json({
            error: e.message
        })
        
    }
}



// signin function
const signin = async(req, res) => {
    const {email, password} = req.body
    try {
        const { error, value} = validate("SIGNIN",req.body);
        if (error) {
            console.log(error);
            return res.send(error.details);  
        }
        const user = await User.findOne({email}).select("+password")
        if( !user ) {
            res.json({
                error: "user not found"
            })
        }
        if( !await user.verifyPassword(password, user.password)){
            res.status(401).json({
                error: "incorrect password"
            })
        }

       const token = getToken(user._id);
        res.status(200).json({
        status: "success",
        token,
        user,
        });
        
    } catch (e) {
        res.json({
            error: e.message
        })
    }
}



// function to get all users
const getAllUsers = async(req, res)=> {
    try {
        // to find the user from mongo
        const users = await User.find()
        return res.json({
            users: users
    })
        
    } catch (error) {
        console.log("err")
    }
    

}


// function for user get by id
const getUserById = async(req, res) => {
    try {
        const { id } = req.params; //destruction when { } is on the left side
        const user = await User.findById(id)
        if( !user ){
            return res.json({
                message: "user not found"
            })
        }
        return res.json({
            user: user
        })
        
    } catch (error) {


        res.json({
            error: "error"
        })
        
    }
    
}


// update user
const updateUser = async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            // populate: "authors",
          });
          if (!user) {
            res.status(404).json({
              status: "error",
              message: "user with this ID does not exist",
            });
          }
          res.status(200).json({
            status: "success",
            user,
          });

        
    } catch (error) {

        res.json({
            error: "error"
        })
        
    }
}

// delete user function
const deleteUser = async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
        res.status(404).json({
            status: "error",
            message: "user with this ID does not exist",
        });
        }
        res.status(204).json({
        status: "success",
        user: null,
        });

        
    } catch (error) {
        res.json({
            error: "error"
        })
        
    }
}


module.exports = {getAllUsers, getUserById, signup, signin, updateUser, deleteUser}