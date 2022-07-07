const userService = require("../services/UserService")

const createUser = async(req, res) => {
    try {
        const userAlreadyExists = await userService.findUserByEmail(req.body.email)
        if (userAlreadyExists) {
            return res.status(400).send({message: "User already exists"})
        }

        const user = await userService.createUser(req.body)
        return res.status(201).send({user})
    } catch (error) {
        console.log(error)
        return res.status(400).send({message: "User creation failed"})
    }
}

const findUser = async(req, res) => {
    try {
        const user = await userService.findUserById(req.params.id)
        if (!user) {
            return res.status(404).send({message: "User not found"})
        }
        return res.status(200).send({user})
    } catch (error) {
        console.log(error)
        return res.status(400).send({message: "User search failed"})
    }
}

const updateUser = async(req, res) => {
    try {
        const userExists = await userService.findUserById(req.params.id)
        if (!userExists) {
            return res.status(404).send({message: "User not found"})
        }

        const updatedUser = await userService.updateUser(req.params.id, req.body)
        return res.status(200).send({user: updatedUser})
    } catch (error) {
        console.log(error)
        return res.status(400).send({message: "User update failed"})
    }
}

const deleteUser = async(req, res) => {
    try {
        const userExists = await userService.findUserById(req.params.id)
        if (!userExists) {
            return res.status(404).send({message: "User not found"})
        }

        const deletedUser = await userService.deleteUser(req.params.id)
        return res.status(200).send({user: deletedUser})
    } catch (error) {
        console.log(error)
        return res.status(400).send({message: "User deletion failed"})
    }
}

const findAllUsers = async(req, res) => {
    try {
        const usersAndCount = await userService.findAllUsers(req.query)
        return res.status(200).send(usersAndCount)
    } catch (error) {
        console.log(error)
        return res.status(400).send({message: "Users search failed"})
    }
}

module.exports = {
    createUser,
    findUser,
    updateUser,
    deleteUser,
    findAllUsers
}