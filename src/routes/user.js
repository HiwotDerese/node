const express = require("express");
const router = express.Router()
// const userController = require("../controller/user")
const {getAllUsers, getUserById, signup, signin, updateUser, deleteUser} = require("../controller/user")

router.route("/")
.get(
    // userController.getAllUsers
    getAllUsers
)
.post(signup)

router.route("/:id")

.get(
    getUserById
)
.put(
    updateUser
)
.patch((req, res) => {
    res.send("update user by id patch")
})
.delete(
    deleteUser
)

router.route("/signin")
.post(
    signin
)

module.exports = router