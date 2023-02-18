import asyncHandler from 'express-async-handler'
import Request from '../models/requestModel.js'
import NgoUser from '../models/ngoUserModel.js'
import mongoose from 'mongoose'

// @desc    Create new request
// @route   POST /api/requests
// @access  Private
const createRequest = asyncHandler(async (req, res) => {
    const { required } = req.body

    if (required === 0) {
        res.status(400)
        throw new Error('No required Qty')
        return
    } else {
        const request = new Request({
            name: req.ngoUser.name,
            requiredQty: required,
            user: req.ngoUser._id,
        })

        const requestcreated = await request.save()

        res.status(201).json(requestcreated)
    }
})

// @desc    Fetch all Requests
// @route   GET /api/requests
// @access  Public
const getRequests = asyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  $options: 'i',
              },
          }
        : {}

    const count = await Request.countDocuments({ ...keyword })
    const requests1 = await Request.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    const Allrequests = await requests1.map(async (request) => {
        const { user } = request
        const requestUser = await NgoUser.findById(user).select('-password')
        return {
            name: request.name,
            requiredQty: request.requiredQty,
            requestId: request._id,
            image: requestUser.image,
            _id: requestUser._id,
            rating: requestUser.rating,
        }
    })
    Promise.all(Allrequests).then(function (requests) {
        res.json({ requests, page, pages: Math.ceil(count / pageSize) })
    })
})

// @desc    Fetch all my Requests
// @route   GET /api/myrequests
// @access  Private
const getMyRequests = asyncHandler(async (req, res) => {
    const requests = await Request.find({ user: req.ngoUser._id })
    res.json(requests)
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteRequest = asyncHandler(async (req, res) => {
    const request = await Request.findById(req.params.id)

    if (request) {
        await request.remove()
        res.json({ message: 'Request deleted' })
    } else {
        res.status(404)
        throw new Error('Request not found')
    }
})

export { createRequest, getRequests, getMyRequests, deleteRequest }
