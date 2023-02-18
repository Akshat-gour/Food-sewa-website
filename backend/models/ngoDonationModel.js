import mongoose from 'mongoose'

const donationSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Ngo',
            unique: true,
        },
        donations: [
            {
                name: { type: String, required: true },
                qty: { type: Number, required: true },
                mobileNo: {
                    type: String,
                    required: true,
                },
                email: {
                    type: String,
                    required: true,
                },
                donatedBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'User',
                },
                date: { type: Date, default: new Date() },
            },
        ],
        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

const NgoDonation = mongoose.model('NgoDonation', donationSchema)

export default NgoDonation
