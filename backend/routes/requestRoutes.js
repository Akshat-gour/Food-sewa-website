import express from 'express'
const router = express.Router()
import {
    createRequest,
    getRequests,
    getMyRequests,
    deleteRequest,
} from '../controllers/requestController.js'

import { ngoProtect } from '../middleware/authMiddleware.js'

router.route('/').get(getRequests).post(ngoProtect, createRequest)
router.route('/myrequests').get(ngoProtect, getMyRequests)
router.route('/:id').delete(ngoProtect, deleteRequest)
export default router
