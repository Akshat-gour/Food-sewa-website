import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import Donation from '../models/userDonations.js'
import Donated from '../models/ngoDonationModel.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, mobileNo, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        mobileNo,
        password,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobileNo: user.mobileNo,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobileNo: user.mobileNo,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.mobileNo = req.body.mobileNo || user.mobileNo
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            mobileNo: updatedUser.mobileNo,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.json({ message: 'User removed' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    User Donations
// @route   POST /api/donate
// @access  Private
const UserDonations = asyncHandler(async (req, res) => {
    const { donations } = req.body
    const { name, qty, image, donatedTo, mobileNo, email } = donations
    const userData = await User.findById(req.user._id).select('-password')

    if (donations && donations.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        const userExists = await Donation.findOne({ user: req.user._id })
        let createdDonation
        if (userExists) {
            createdDonation = await Donation.updateOne(
                { user: req.user._id },
                {
                    $push: {
                        donations: {
                            name,
                            qty,
                            mobileNo,
                            email,
                            image,
                            donatedTo,
                        },
                    },
                }
            )
        } else {
            const donate = new Donation({
                donations: {
                    name,
                    qty,
                    mobileNo,
                    email,
                    image,
                    donatedTo,
                },
                user: req.user._id,
            })
            createdDonation = await donate.save()
        }

        const ngoUserExists = await Donated.findOne({ user: donatedTo })
        let createdDonations
        if (ngoUserExists) {
            createdDonation = await Donated.updateOne(
                { user: donatedTo },
                {
                    $push: {
                        donations: {
                            name: userData.name,
                            mobileNo: userData.mobileNo,
                            email: userData.email,
                            qty,
                            donatedBy: req.user._id,
                        },
                    },
                }
            )
        } else {
            const donate = new Donated({
                donations: {
                    name: userData.name,
                    qty,
                    mobileNo: userData.mobileNo,
                    email: userData.email,
                    donatedBy: req.user._id,
                },
                user: donatedTo,
            })

            // mobileNo,
            // email,
            createdDonations = await donate.save()
        }

        res.status(201).json(createdDonation)
    }
})

// @desc    User Donations
// @route   get /api/donate
// @access  Private
const getUserDonations = asyncHandler(async (req, res) => {
    const userExists = await Donation.findOne({ user: req.user._id })
    if (!userExists) {
        res.status(404)
        throw new Error('User not found')
    }
    res.status(201).json(userExists)
})

export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    UserDonations,
    getUserDonations,
}
