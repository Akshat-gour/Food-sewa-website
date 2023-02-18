import mongoose from 'mongoose'

const requestSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Ngo',
        },
        name: {
            type: String,
            required: true,
        },
        requiredQty: {
            type: Number,
            required: true,
        },
        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },
        deliveredAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
)

const Request = mongoose.model('Request', requestSchema)

export default Request
