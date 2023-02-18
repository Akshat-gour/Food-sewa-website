import mongoose from 'mongoose'

const donationSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
            unique: true,
        },
        donations: [
            {
                name: { type: String, required: true },
                qty: { type: Number, required: true },
                image: { type: String, required: true },
                mobileNo: {
                    type: String,
                    required: true,
                },
                email: {
                    type: String,
                    required: true,
                },
                donatedTo: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Request',
                },
                date: { type: Date, default: Date.now },
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

const Donation = mongoose.model('Donation', donationSchema)

export default Donation
