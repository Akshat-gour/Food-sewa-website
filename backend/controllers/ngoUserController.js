import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import NgoUser from '../models/ngoUserModel.js'
import NgoDonation from '../models/ngoDonationModel.js'

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await NgoUser.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        )

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length

        await product.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    get User Donations
// @route   get /api/donate
// @access  Private
const getUserDonations = asyncHandler(async (req, res) => {
    const userExists = await NgoDonation.findOne({ user: req.ngoUser._id })
    if (!userExists) {
        res.status(404)
        throw new Error('User not found')
    }

    res.status(201).json(userExists.donations)
})

// @desc    Get user profile
// @route   GET /api/NgoUser/profile
// @access  Private
const getNgoUserProfile = asyncHandler(async (req, res) => {
    const ngoUser = await NgoUser.findById(req.ngoUser._id).select('-password')
    if (ngoUser) {
        res.json({
            _id: ngoUser._id,
            name: ngoUser.name,
            email: ngoUser.email,
            mobileNo: ngoUser.mobileNo,
            description: ngoUser.description,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get user Data
// @route   GET /api/NgoUser/Data
// @access  Public
const getNgoUserData = asyncHandler(async (req, res) => {
    const requestUser = await NgoUser.findById(req.params.id).select(
        '-password'
    )
    if (requestUser) {
        res.json({
            email: requestUser.email,
            mobileNo: requestUser.mobileNo,
            name: requestUser.name,
            image: requestUser.image,
            reviews: requestUser.reviews,
            description: requestUser.description,
            rating: requestUser.rating,
            numReviews: requestUser.numReviews,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Auth user & get token
// @route   POST /api/NgoUser/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await NgoUser.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobileNo: user.mobileNo,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc    Register a new ngo user
// @route   POST /api/ngousers
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, mobileNo, description, image, password, location } =
        req.body

    const userExists = await NgoUser.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await NgoUser.create({
        name,
        email,
        mobileNo,
        description,
        image,
        password,
        location,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobileNo: user.mobileNo,
            description: user.description,
            location: user.location,
            image: user.image,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Update user profile
// @route   PUT /api/NgoUser/profile
// @access  Private
const updateNgoUserProfile = asyncHandler(async (req, res) => {
    const ngoUser = await NgoUser.findById(req.ngoUser._id)

    if (ngoUser) {
        ngoUser.name = req.body.name || ngoUser.name
        ngoUser.email = req.body.email || ngoUser.email
        ngoUser.mobileNo = req.body.mobileNo || ngoUser.mobileNo
        ngoUser.image = req.body.image || ngoUser.image
        ngoUser.description = req.body.description || ngoUser.description
        if (req.body.password) {
            ngoUser.password = req.body.password
        }

        const updatedUser = await ngoUser.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            mobileNo: updatedUser.mobileNo,
            image: updatedUser.image,
            description: updatedUser.description,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export {
    authUser,
    registerUser,
    updateNgoUserProfile,
    getNgoUserProfile,
    getNgoUserData,
    getUserDonations,
    createProductReview,
}
