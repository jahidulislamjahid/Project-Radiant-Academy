import mongoose from 'mongoose';
const ReviewSchema = new mongoose.Schema({

    forumId: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    authorImg: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    status: {
        type: Boolean,
        required: true,
    },

    commentorEmail:{
        type: String,
        required: true,
    },
    commentorName : {
        type: String,
        required: true,
    },
    commentorPic : {
        type: String,
        required: true,
    },

},

    { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);