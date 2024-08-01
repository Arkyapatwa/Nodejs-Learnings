const express = require('express');
const { getAllUsers, createUser, getUserById, updateUserById, deleteUserById } = require('../controllers/user')

const router = express.Router()

router.route('/')
.get(getAllUsers)
.post(createUser)

router.route('/:id')
.get(getUserById)
.patch(updateUserById)
.delete(deleteUserById)