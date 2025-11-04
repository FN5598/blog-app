const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Comment content is required'],
        maxlength: [1000, 'Comment cannot exceed 1000 characters'],
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    parent_comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null // For nested replies
    },
    // For nested comments
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    likes_count: {
        type: Number,
        default: 0
    },
    is_edited: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

commentSchema.pre('save', function(next) {
    this.likes_count = this.likes.length;
    next();
});

module.exports = mongoose.model('Comment', commentSchema);