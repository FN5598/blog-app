const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Post title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    content: {
        type: String,
        required: [true, 'Post content is required'],
        maxlength: [10000, 'Content cannot exceed 10000 characters']
    },
    // User reference (foreign key)
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Post author is required']
    },
    author_name: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    genre: {
        type: String,
        trim: true
    },
    
    // Likes system - array of user IDs who liked the post
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    
    // Reposts system - array of repost objects
    reposts: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        created_at: {
            type: Date,
            default: Date.now
        }
    }],
    
    // Comments - will be a separate collection but referenced here
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    
    // For quick counts without populating
    likes_count: {
        type: Number,
        default: 0
    },
    reposts_count: {
        type: Number,
        default: 0
    },
    comments_count: {
        type: Number,
        default: 0
    },
    
    // Post visibility and status
    is_published: {
        type: Boolean,
        default: true
    },
    visibility: {
        type: String,
        enum: ['public', 'private', 'friends'],
        default: 'public'
    },
    
    // For future features
    tags: [{
        type: String,
        trim: true
    }],
    media: [{
        url: String,
        type: {
            type: String,
            enum: ['image', 'video', 'gif']
        },
        caption: String
    }]

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Update counters before saving
postSchema.pre('save', function(next) {
    this.likes_count = this.likes.length;
    this.reposts_count = this.reposts.length;
    this.comments_count = this.comments.length;
    next();
});

// Index for better performance
postSchema.index({ author: 1, created_at: -1 });
postSchema.index({ likes_count: -1, created_at: -1 });
postSchema.index({ tags: 1 });

module.exports = mongoose.model('Post', postSchema);