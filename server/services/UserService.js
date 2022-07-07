const User = require("../database/models/userModel")

const createUser = async(userData) => {
    const newUser = await User.create(userData)
    return newUser
}

const findUserByEmail = async(email) => {
    const user = await User.findOne({email: email})
    return user
}

const findUserById = async(id) => {
    const user = await User.findById(id)
    return user
}

const updateUser = async(id, userData) => {
    const updatedUser = await User.findByIdAndUpdate(id, userData, {lean: true})
    return updatedUser
}

const deleteUser = async(id) => {
    const deletedUser = await User.findByIdAndDelete(id)
    return deletedUser
}

const findAllUsers = async({page, limit}) => {
    const users = await User.find().skip((page -1) * limit).limit(limit).exec()
    const totalUsers = await User.count()
    return {users, totalUsers}
}

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    updateUser,
    deleteUser,
    findAllUsers
}