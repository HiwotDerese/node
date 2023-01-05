const express = require("express");
const bookController = require("../controller/book");
const bookValidation = require("../middleware/validation/book");
const { verifyUser } = require("../middleware/auth");

const router = express.Router();

/**
 * Routes for handling
 *  - Get All Books
 *  - Create Book
 */
router
  .route("/")
  .get(verifyUser, bookController.getAllBooks)
  .post(
    verifyUser,
    bookController.uploadImage,
    bookValidation.validate("CREATE"),
    bookController.createBook
  );

/**
 * Routes for handling
 *  - Get Single Book
 *  - Update Book
 *  - Delete Book
 */
router
  .route("/:id")
  .get(verifyUser, bookValidation.validate("GET"), bookController.getBook)
  .patch(
    verifyUser,
    bookValidation.validate("UPDATE"),
    bookController.updateBook
  )
  .delete(
    verifyUser,
    bookValidation.validate("DELETE"),
    bookController.deleteBook
  );

module.exports = router;





















// const express = require("express");
// const { route } = require("./user");
// const router = express.Router()

// router.route("/")
// .get((req, res) => {
//     res.send("get all books")
// })
// .post((req, res) => {
//     res.send("create books")
// })

// router.route("/:id")
// .get((req, res) => {
//     res.send("get books by id")
// })
// .put((req, res) => {
//     res.send("update books by id")
// })
// .patch((req, res) => {
//     res.send("update book by id patch")
// })
// .delete((req, res) => {
//     res.send("delete by id")
// })

// module.exports = router