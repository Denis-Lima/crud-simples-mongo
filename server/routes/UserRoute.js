const router = require("express").Router()
const userController = require("../controllers/userController")

router.post("/", userController.createUser)
router.get("/:id", userController.findUser)
router.patch("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)
router.get("/", userController.findAllUsers)

module.exports = router