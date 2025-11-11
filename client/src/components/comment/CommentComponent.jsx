import { useState, useEffect } from 'react';
import axios from 'axios';
import './CommentComponent.css';
import { CommentsList } from './CommentsList';

export function CommentComponent({ postId, setShowComments }) {
    const [commentContent, setCommentContent] = useState('');
    const [isExpanded, setIsExpanded] = useState(true);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments(postId);
    }, [postId]);

    async function getComments(postId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/${postId}/comments`,
                {
                    withCredentials: true
                });
                console.log("Comment:", res.data.data);
                setComments(res.data.data);
        } catch (err) {
            if (err.response?.data?.message) {
                return console.log(err.response.data.message);
            } else {
                return console.log("Failed to fetch comments");
            }
        }
    }

    const userId = localStorage.getItem("userId");
    async function createComment(postId) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/post/${postId}/comments`,
                {
                    content: commentContent,
                    userId: userId
                }, {
                withCredentials: true
            });

            if (res.data?.success) {
                console.log(res.data);
                getComments(postId);
            }
        } catch (err) {
            if (err.response?.data?.message) {
                return console.log(err.response.data.message);
            } else {
                return console.log("Failed to create a comment");
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (commentContent.trim()) {
            await createComment(postId);
            setCommentContent('');
            setIsExpanded(false);
        }
    };

    const handleCancel = () => {
        setCommentContent('');
        setIsExpanded(false);
        setShowComments(false);
    };

    return (
        <div className="comment-component">
            {isExpanded && (
                <>
                    <form className="comment-form" onSubmit={handleSubmit}>
                        <textarea
                            className="comment-textarea"
                            placeholder="Write your comment..."
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            autoFocus
                            rows="3"
                        />
                        <div className="comment-actions">
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={!commentContent.trim()}
                            >
                                Post Comment
                            </button>
                        </div>
                    </form>
                    <div>
                        <CommentsList comments={comments}/>;
                    </div>
                </>
            )}
        </div>
    );
}