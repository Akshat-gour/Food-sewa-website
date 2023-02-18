import express from 'express'
const router = express.Router()
import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    UserDonations,
    getUserDonations,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, getUsers)
router.post('/login', authUser)
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router
    .route('/donate')
    .get(protect, getUserDonations)
    .post(protect, UserDonations)

export default router
