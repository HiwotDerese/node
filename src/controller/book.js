
const Book = require("../models/book");
const { validationResult } = require("express-validator");
// multer to upload files
const multer = require("multer");
const path = require("path");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/img"));
  },
  filename: function (req, file, cb) {
    cb(null, `book-${Date.now()}-cover${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
});

exports.uploadImage = upload.single("img");

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.getAllBooks = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const result = await Book.paginate(
      {
        $or: [
          {
            creator: { $eq: req.user._id },
          },
          {
            authors: { $eq: req.user._id },
          },
        ],
      },
      {
        page,
        limit,
        sort: "-createdAt",
      }
    );
    res.status(200).json({
      status: "success",
      result,
    });
  } catch (err) {
    //TODO
  }
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.getBook = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const book = await Book.findById(req.params.id).populate("authors");
    if (!book) {
      res.status(404).json({
        status: "error",
        message: "Book with this ID does not exist",
      });
    }
    res.status(200).json({
      status: "success",
      book,
    });
  } catch (err) {
    //TODO
  }
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.createBook = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const book = await Book.create({
      ...req.body,
      img: req.file.filename,
      creator: req.user._id,
      authors: [req.user._id],
    });
    res.status(201).json({
      status: "success",
      book,
    });
  } catch (err) {
    //TODO
  }
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.updateBook = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      populate: "authors",
    });
    if (!book) {
      res.status(404).json({
        status: "error",
        message: "Book with this ID does not exist",
      });
    }
    res.status(200).json({
      status: "success",
      book,
    });
  } catch (err) {
    //TODO
  }
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.deleteBook = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(404).json({
        status: "error",
        message: "Book with this ID does not exist",
      });
    }
    res.status(204).json({
      status: "success",
      book: null,
    });
  } catch (err) {
    //TODO
  }
};



































































// const { request } = require("express")
// const e = require("express")
// const Book = require("../models/book")
// // const {validationResult} = require("express-validator")
// const { validate } = require("../middleware/validation/book")

// // const Joi = require("joi")


// // controller for each router

// // create function to register/create a book
// const createBook = async(req, res) => {
//     // accept from postman body we can say {req.body}
//     const {title, description, image, creator, authors, content} = req.body
//     try {
//         const { error, value} = validate(req.body);
//         if (error) {
//             console.log(error);
//             return res.send(error.details);  
//         }
//         const book = await Book.create({title, descri, image, creator})
//         res.status(201).json({
//             book
//         })
 
//     } catch (e) {
//         res.json({
//             error: e.message
//         })
        
//     }
// }



// // signin function
// const signin = async(req, res) => {
//     const {email, password} = req.body
//     try {
//         const { error, value} = validate(req.body);
//         if (error) {
//             console.log(error);
//             return res.send(error.details);  
//         }
//         const user = await User.findOne({email}).select("+password")
//         if( !user ) {
//             res.json({
//                 error: "user not found"
//             })
//         }
//         if( !await user.verifyPassword(password, user.password)){
//             res.status(401).json({
//                 error: "incorrect password"
//             })
//         }
//         res.json({
//             message: "signed in successfully",
//             user
//         })
        
//     } catch (e) {
//         res.json({
//             error: e.message
//         })
//     }
// }



// // function to get all users
// const getAllUsers = async(req, res)=> {
//     try {
//         // to find the user from mongo
//         const users = await User.find()
//         return res.json({
//             users: users
//     })
        
//     } catch (error) {
//         console.log("err")
//     }
    

// }


// // function for user get by id
// const getUserById = async(req, res) => {
//     try {
//         const { id } = req.params; //destruction when { } is on the left side
//         const user = await User.findById(id)
//         if( !user ){
//             return res.json({
//                 message: "user not found"
//             })
//         }
//         return res.json({
//             user: user
//         })
        
//     } catch (error) {


//         res.json({
//             error: "error"
//         })
        
//     }
    
// }


// // update user
// const updateUser = async(req, res) => {
//     try {
//         const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             // populate: "authors",
//           });
//           if (!user) {
//             res.status(404).json({
//               status: "error",
//               message: "user with this ID does not exist",
//             });
//           }
//           res.status(200).json({
//             status: "success",
//             user,
//           });

        
//     } catch (error) {

//         res.json({
//             error: "error"
//         })
        
//     }
// }

// // delete user function
// const deleteUser = async(req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id);
//         if (!user) {
//         res.status(404).json({
//             status: "error",
//             message: "user with this ID does not exist",
//         });
//         }
//         res.status(204).json({
//         status: "success",
//         user: null,
//         });

        
//     } catch (error) {
//         res.json({
//             error: "error"
//         })
        
//     }
// }


// module.exports = {getAllUsers, getUserById, signup, signin, updateUser, deleteUser}